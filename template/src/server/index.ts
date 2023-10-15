import fs from "fs";
import { createCraqServer, configureContext } from "craq-server";
import getReactRenderer from "craq-react-renderer/dist/server";
import webpackBuildServerMiddleware from "craq-webpack/dist/server";
import Router6 from "router6";

import store from "../frontend/store";
import routes from "../frontend/routes";
import bundles from "../frontend/bundles";
import { actions, components } from "../frontend/registries";
import Application from "../frontend/Application";

createCraqServer(
  configureContext({
    actions,
    components,
    getRouter: () => {
      const router = new Router6(routes);

      router.use(
        webpackBuildServerMiddleware({
          bundles,
          assetsPath: ASSETS_PATH,
          statsFile: {
            content: JSON.parse(fs.readFileSync(STATS_FILE_PATH).toString())
              .assetsByChunkName,
          },
        })
      );

      return router;
    },
    getStore: () => store,
  }),
  { renderers: { react: getReactRenderer(Application, {}) } }
).listen(3001);
