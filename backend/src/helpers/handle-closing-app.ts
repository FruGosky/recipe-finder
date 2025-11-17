import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

export const handleClosingServer = (server: HttpServer | HttpsServer) => {
  const shutdown = () => {
    console.log('Shutting down...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    shutdown();
  });
};
