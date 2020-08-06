import { MatxLoadable } from "matx";
import { authRoles } from "../../../auth/authRoles";

const AccountSettings = MatxLoadable({
  loader: () => import("./AccountSettings")
})

const accountSettingsRoutes = [
	{
    path: "/account/settings",
    component: AccountSettings,
  }
];

export default accountSettingsRoutes;
