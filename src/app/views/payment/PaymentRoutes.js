import { MatxLoadable } from "matx";

const PaymentForm = MatxLoadable({
  loader: () => import("./PaymentForm")
})


const PaymentResponse = MatxLoadable({
  loader: () => import("./PaymentResponse")
})

const paymentRoutes = [
  {
    path: "/payment/summary",
    component: PaymentForm
  },
  {
    path: "/payment/confirm",
    component: PaymentResponse
  },
];

export default paymentRoutes;
