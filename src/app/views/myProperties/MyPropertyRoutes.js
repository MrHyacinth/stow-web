import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const MyProperties = MatxLoadable({
  loader: () => import("./MyProperties")
})

const MyProperty = MatxLoadable({
  loader: () => import("./MyProperty")
})

const myPropertyRoutes = [
  {
    path: "/user/properties",
    component: MyProperties,
  },
  {
    path: "/user/property/:id",
    component: MyProperty,
  },
];

export default myPropertyRoutes;
