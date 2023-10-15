import { useRouter } from "router6-react";
import { CraqReactReduxProvider } from "craq-react-redux";
import { Context } from "craq";
import { ComponentType } from "react";
import { Route } from "router6";

type PageComponentType = ComponentType<{ route: Route }>;
const Application = ({ context }: { context: Context<any, any> }) => {
  const { currentRoute } = useRouter();

  const PageComponent = context.getComponent<PageComponentType>(
    currentRoute.config.page,
    "page"
  );

  return PageComponent ? (
    <CraqReactReduxProvider store={context.getStore()}>
      <PageComponent route={currentRoute} />
    </CraqReactReduxProvider>
  ) : null;
};

export default Application;
