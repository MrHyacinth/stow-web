import "../styles/_app.scss";
import 'antd/dist/antd.css';
import './views/properties/components/propertySearchCard.css';
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";

import firebase from "firebase";
import { FirestoreProvider } from 'react-firestore';

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <FirestoreProvider firebase={firebase}>
        <Provider store={Store}>
          <MatxTheme>
            <Auth>
              <Router history={history}>
                <AuthGuard>
                  <MatxLayout />
                </AuthGuard>
              </Router>
            </Auth>
          </MatxTheme>
        </Provider>
      </FirestoreProvider>
    </AppContext.Provider>
  );
};

export default App;
