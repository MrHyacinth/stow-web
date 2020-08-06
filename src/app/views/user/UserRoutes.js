import { MatxLoadable } from "matx";
// import { authRoles } from "../../../auth/authRoles";

const Transactions = MatxLoadable({
  loader: () => import("./transactions/Transactions")
})

const userRoutes = [
	{
    path: "/user/transactions",
    component: Transactions,
  }
];

export default userRoutes;
