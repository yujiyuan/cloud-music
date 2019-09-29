import React from 'react';
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { HashRouter } from 'react-router-dom'
import routes from './routes';
import store from "./store/index";
import './styles/App.scss';
function App () {

  return (
    <Provider store={store}>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>

  );
}

export default App;
