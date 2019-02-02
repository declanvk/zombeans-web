import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import DesktopApp from "./components/desktop_app";
import MobileApp from "./components/mobile_app";
import "./assets/scss/app.scss";

const rootEl = document.getElementById("root");

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

let app;
let app_file: string;
if (isMobileDevice()) {
  app = <MobileApp />;
  app_file = './components/mobile_app'
} else {
  app = <DesktopApp />;
  app_file = './components/desktop_app'
}

render(
  <AppContainer>
    {app}
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept(app_file, () => {
    const NewApp = require(app_file).default;

    render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      rootEl
    );
  });
}
