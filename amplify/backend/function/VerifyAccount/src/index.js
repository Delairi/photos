

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { verifyCognito } = require('/opt/nodejs/utils');

exports.handler = async (event) => {
  const { username, code } = event;

  try {
    const response = await verifyCognito({username, code})

    console.log('Confirmaciòn exitoso:', response);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Confirmaciòn exitosa',
        accessToken: response
      }),
    };
  } catch (error) {
    console.error('Confirmaciòn error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Confirmaciòn error',
        error: error.message,
      }),
    };
  }
};
