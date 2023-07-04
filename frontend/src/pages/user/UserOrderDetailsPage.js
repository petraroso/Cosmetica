import UserOrderDetails from "../../components/UserOrderDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";

//orderId from url parameter
const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};
const loadPayPalScript = (
  cartSubtotal,
  cartItems,
  orderId,
  updateStateAfterOrder
) => {
  loadScript({
    "client-id":
      "ATX_GMWUjteSYhLNL-Gdi2FFyT0xE9T8CtTmDPXdMKDzXaSz3aGGfsvzzSrjU0qxRbz3xPAofScHgkZ3",
  })
    .then((paypal) => {
      paypal
        .Buttons(
          buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder)
        )
        .render("#paypal-container-element");
    })
    .catch((err) => {
      console.error("Failed to load PayPal JS SDK script", err);
    });
};

const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
  return {
    createOrder: function (data, actions) {
      //creating the order based on cartSubtotal and cartItems arguments
      //following paypal documentation
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  //to do: change to eur
                  currency_code: "USD",
                  value: cartSubtotal,
                },
              },
            },
            //creating an object for every product in the order
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },
    onCancel: onCancelHandler,
    //to save in our db, not only at paypal db
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (
          transaction.status === "COMPLETED" &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          //user paid and order can be updated in db
          updateOrder(orderId)
            .then((data) => {
              if (data.isPaid) {
                updateStateAfterOrder(data.paidAt);
              }
            })
            .catch((er) => console.log(er));
        }
      });
    },
    onError: onErrorHandler,
  };
};

const onCancelHandler = function () {
  console.log("cancel");
};

const onErrorHandler = function (err) {
  console.log("error");
};

const updateOrder = async (orderId) => {
  const { data } = await axios.put("/api/orders/paid/" + orderId);
  return data;
};

export default function UserOrderDetailsPage() {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const getUser = async () => {
    //user id from redux
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };
  return (
    <UserOrderDetails
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPayPalScript={loadPayPalScript}
    />
  );
}
