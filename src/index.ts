import Fastify from 'fastify';
import screenshotRoute from './routes/screenshot';

const fastify = Fastify({
  logger: true,
});

// Register the screenshot route
fastify.register(screenshotRoute);

// Start the server
const start = async () => {
  try {
    // Correct way to specify host and port
    await fastify.listen({ port: 8080, host: '0.0.0.0' });  // Listen on all interfaces
    fastify.log.info(`Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
