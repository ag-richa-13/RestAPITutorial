console.log("Welcome to rest api tutorial");

import app from "./src/app";
import { config } from "./src/config/config";

const startServer = () => {
  const port = config.port || 3000;
  app.listen(port, () => {
    console.log(`Server is listening on :  http://localhost:${port}`);
  });
};

startServer();
