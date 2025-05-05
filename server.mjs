import { startServer } from './dist/server/entry.mjs';

startServer({
  port: process.env.PORT || 3000
});