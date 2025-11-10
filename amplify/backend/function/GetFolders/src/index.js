/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { getDbPool } = require('/opt/nodejs/utils');

exports.handler = async (event) => {

    try {
        const claims = event.requestContext?.authorizer?.claims;
        const username = claims?.['cognito:username'];

        if (!username) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Unauthorized user' }),
            };
        }

        const pool = await getDbPool();
        const query = `
            SELECT name, username FROM photos WHERE username = $1;
            `;
        const result = await pool.query(query, [username]);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(result.rows),
        };

    } catch (error) {
        console.error("Error get folders:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
