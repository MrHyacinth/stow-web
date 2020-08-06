import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";


const PropertyCheckoutForm = MatxLoadable({
  loader: () => import("./PropertyCheckoutForm")
})

const checkoutRoutes = [
	{
    path: "/checkout/:pid",
    component: PropertyCheckoutForm,
  }
];

export default checkoutRoutes;
