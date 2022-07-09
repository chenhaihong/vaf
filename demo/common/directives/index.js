import installHljs from "./hljs";

const installDirectives = (app) => {
  app.use(installHljs);
};
export default installDirectives;
