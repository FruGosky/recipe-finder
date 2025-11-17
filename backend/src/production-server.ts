import { app } from './app';
import ServerlessHttp from 'serverless-http';

module.exports.handler = ServerlessHttp(app);
