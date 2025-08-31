

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm')
const crypto = require('crypto')

const getSecretHash = (username, clientId, clientSecret) => {
    return crypto
        .createHmac('sha256', clientSecret)
        .update(username + clientId)
        .digest('base64');
};

const ssm = new SSMClient({ region: 'us-east-2' });
const client = new CognitoIdentityProviderClient({ region: 'us-east-2' });

const loginCognito = async (username, password) => {

    const getParametersCommand = new GetParametersCommand({
        Names: ['ClientId', 'ClientSecret'],
        WithDecryption: true
    });
    const parameters = (await ssm.send(getParametersCommand))?.Parameters.reduce((prev, current) => {
        const name = current.Name
        const value = current.Value
        prev[name] = value
        return prev
    }, {})

    const secretHash = getSecretHash(username, parameters.ClientId, parameters.ClientSecret)

    const params = {
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: parameters.ClientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: secretHash,
        },
    };

    const command = new InitiateAuthCommand(params);
    return await client.send(command);
}


module.exports = { loginCognito, getSecretHash };