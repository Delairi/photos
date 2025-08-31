/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
const { signupCognito } = require('/opt/nodejs/utils');
exports.handler = async (event) => {
    

    try {
        const { username, password, email, name } = event;
    const response = await signupCognito({ email, name, password, username })
        console.log('Signup exitoso:', response);
    
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Signup exitoso',
            accessToken: response
          }),
        };
      } catch (error) {
        console.error('Signup error:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Signup error',
            error: error.message,
          }),
        };
      }
};
