import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const MortgageCalculator = MatxLoadable({
  loader: () => import("./MortgageCalculator")
})

const mortgageCalculatorRoutes = [
	{
    path: "/mortgage/calculator",
    component: MortgageCalculator,
  }
];

export default mortgageCalculatorRoutes;
