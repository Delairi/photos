/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { spawn } = require('child_process');

exports.handler = async (event) => {
    console.log("Starting Prisma migrations...");
    return new Promise((resolve, reject) => {
        const proc = spawn('npx', ['prisma', 'migrate', 'deploy'], {
            stdio: 'inherit',
            shell: true
        });

        proc.on('close', (code) => {
            if (code === 0) {
                console.log("✅ Migrations applied successfully!");
                resolve({ statusCode: 200, body: 'Migrations complete.' });
            } else {
                console.error("❌ Migration failed with code", code);
                reject(new Error(`Migrations failed (exit code ${code})`));
            }
        });
    });
};
