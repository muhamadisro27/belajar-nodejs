import { logger } from "./app/logging.js";
import { web } from "./app/web.js";

const port = 5000;

web.listen(port, () => {
  logger.info(`app listening on http://localhost:${port}`);
});
