import React from "react";
import { Redirect } from "react-router-dom";

import sessionRoutes from "./views/sessions/SessionRoutes";

import homeRoutes from "./views/home/HomeRoutes.js";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import propertyRoutes from "./views/properties/PropertyRoutes";
import myPropertyRoutes from "./views/myProperties/MyPropertyRoutes";
import checkoutRoutes from "./views/checkout/CheckoutRoutes";

import paymentRoutes from "./views/payment/PaymentRoutes";

import mortgageCalculatorRoutes from "./views/mortgageCalculator/MortgageCalculatorRoutes";
import accountSettingsRoutes from "./views/user/settings/AccountSettingsRoutes";
import userRoutes from "./views/user/UserRoutes";

import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";

import formsRoutes from "./views/forms/FormsRoutes";
import mapRoutes from "./views/map/MapRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/404" />
  }
];

const routes = [
  ...sessionRoutes,
  
  ...homeRoutes,
  ...dashboardRoutes,
  ...propertyRoutes,
  ...myPropertyRoutes,
  ...checkoutRoutes,

  ...paymentRoutes,
  
  ...mortgageCalculatorRoutes,
  ...accountSettingsRoutes,
  ...userRoutes,

  ...materialRoutes,
  ...utilitiesRoutes,
  ...dragAndDropRoute,
  ...formsRoutes,
  ...mapRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
