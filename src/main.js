// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import HelmetPlugin from 'fusion-plugin-react-helmet-async';
import Styletron from 'fusion-plugin-styletron-react';

import root from './root.js';

export default () => {
  const app = new App(root);
  app.register(HelmetPlugin);
  app.register(Styletron);
  app.register(Router);
  return app;
};
