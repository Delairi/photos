

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { getDbPool } = require('/opt/nodejs/utils');

exports.handler = async (event) => {

    try {
        console.log(event)
        console.log(event.requestContext)
        const claims = event.requestContext?.authorizer?.claims;
        const username = claims?.['cognito:username']

        if (!username) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Unauthorized' }),
            };
        }

        const { name } = event;

        const pool = await getDbPool();
        const query = `
      INSERT INTO photos (name, username)
      VALUES ($1, $2)
      RETURNING *;
    `;
        const values = [name, username];

        const result = await pool.query(query, values);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Album created successfully",
                user: result.rows[0],
            }),
        };
    } catch (error) {
        console.error("DB Insert Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }

};
