import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Analytics = MatxLoadable({
  loader: () => import("./Analytics")
})

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Analytics,
  }
];

export default dashboardRoutes;
