/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { loginCognito } = require('/opt/nodejs/utils');


exports.handler = async (event) => {
  const { username, password } = event;

  try {
    const response = await loginCognito(username, password)

    console.log('Login exitoso:', response);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login exitoso',
        accessToken: response.AuthenticationResult.AccessToken,
      }),
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Login error',
        error: error.message,
      }),
    };
  }
};
