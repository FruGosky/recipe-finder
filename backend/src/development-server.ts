import { app } from './app';
import { ENV } from './env';
import { handleClosingServer } from './helpers/handle-closing-app';

const server = app.listen(ENV.PORT, () => {
  console.info(`Server is running on PORT: ${ENV.PORT}`);
});

handleClosingServer(server);
