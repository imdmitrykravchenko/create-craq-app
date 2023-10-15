import { createCraqClient, configureContext } from "craq-client";
import webpackBuildClientMiddleware from "craq-webpack/dist/client";
import getReactRenderer from "craq-react-renderer/dist/client";
import Router6 from "router6";
import routes from "../frontend/routes";

import { actions, components } from "../frontend/registries";
import Application from "../frontend/Application";
import store from "../frontend/store";
import bundles from "../frontend/bundles";

const router = new Router6(routes);

router.use(webpackBuildClientMiddleware({ bundles }));

createCraqClient(
  configureContext({
    actions,
    components,
    router,
    store,
  }),
  {
    renderers: {
      react: getReactRenderer(Application, {
        node: document.getElementById("root"),
      }),
    },
  }
)
  .run(document.location.href)
  .render();
