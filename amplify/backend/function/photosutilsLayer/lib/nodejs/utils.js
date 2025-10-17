

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm')
const crypto = require('crypto')
const ssm = new SSMClient({ region: 'us-east-2' });
const client = new CognitoIdentityProviderClient({ region: 'us-east-2' });

const { Pool } = require("pg");
let pool;

const getParameters = async (username) => {

    const getParametersCommand = new GetParametersCommand({
        Names: ['ClientId']
    });
    const parameters = (await ssm.send(getParametersCommand))?.Parameters.reduce((prev, current) => {
        const name = current.Name
        const value = current.Value
        prev[name] = value
        return prev
    }, {})

    return {
        // secretHash: crypto
        //     .createHmac('sha256', parameters.ClientSecret)
        //     .update(username + parameters.ClientId)
        //     .digest('base64'),
        clientId: parameters.ClientId,
    };
};




const loginCognito = async (username, password) => {



    const { clientId } = await getParameters(username)

    const params = {
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: clientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            // SECRET_HASH: secretHash,
        },
    };

    const command = new InitiateAuthCommand(params);
    return await client.send(command);
}

const signupCognito = async ({ username, password, email, name }) => {

    const { clientId } = await getParameters(username)

    const params = {
        ClientId: clientId,
        Username: username,
        Password: password,
        // SecretHash: secretHash,
        UserAttributes: [
            {
                Name: "email",
                Value: email,
            },
            {
                Name: "name",
                Value: name,
            },
        ],
    };

    const command = new SignUpCommand(params);
    return await client.send(command);

}


const verifyCognito = async ({ code, username }) => {

    const { clientId } = await getParameters(username)

    const params = {
        ClientId: clientId,
        // SecretHash: secretHash,
        Username: username,
        ConfirmationCode: code,
        ForceAliasCreation: false
    };
    const command = new ConfirmSignUpCommand(params);
    return await client.send(command);
}

const migrations = [
    `CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`,
  
  `ALTER TABLE IF EXISTS photos 
   ADD COLUMN IF NOT EXISTS username TEXT;` 
];

const getDbPool = async () => {
    if (pool) return pool;
    const secret = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };

    pool = new Pool({
        host: secret.host,
        port: secret.port,
        user: secret.user,
        password: secret.password,
        database: secret.database,
        max: 3,
        idleTimeoutMillis: 30000,
        ssl: { rejectUnauthorized: false },
    });
    for (const query of migrations) {
        await pool.query(query);
    }
    return pool
}
module.exports = { loginCognito, getParameters, signupCognito, verifyCognito, getDbPool };