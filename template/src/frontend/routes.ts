import { RouteDefinition } from "router6";

const routes: RouteDefinition[] = [
  {
    path: "/",
    name: "home",
    config: {
      renderer: "react",
      bundle: 'home'
    },
  },
];

export default routes;
