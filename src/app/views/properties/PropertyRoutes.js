import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Properties = MatxLoadable({
  loader: () => import("./Properties")
})

const Property = MatxLoadable({
  loader: () => import("./Property")
})

const propertyRoutes = [
  {
    path: "/properties",
    component: Properties,
  },
	{
    path: "/property/:id",
    component: Property,
  }
];

export default propertyRoutes;
