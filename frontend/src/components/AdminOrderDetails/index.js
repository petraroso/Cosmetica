import DeliveryDetails from "../DeliveryDetails";
import PaymentMethod from "../PaymentMethod";
import CartProductCard from "../CartProductCard";
//import OrderCartSummary from "../OrderCartSummary";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

//import image1 from "../../images/image1.jpg";

export default function AdminOrderDetails({ getOrder, markAsDelivered }) {
  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState(
    "Označite kao dostavljeno"
  );
  const [cartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();

  //getting dynamic id parameter from url address
  const { id } = useParams();
  useEffect(() => {
    getOrder(id)
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setOrderButtonMessage("Narudžba završena");
          setButtonDisabled(true);
        }
        setCartItems(order.cartItems);
      })
      .catch(
        (er) => dispatch(logout())
        //console.log(
        // er.response.data.message ? er.response.data.message : er.response.data
        //)
      );
  }, [getOrder, id, isDelivered, dispatch]);
  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h2>DETALJI NARUDŽBE</h2>
      <hr></hr>
      <DeliveryDetails
        name={userInfo.name}
        lastName={userInfo.lastName}
        address={userInfo.address}
        city={userInfo.city}
        zipCode={userInfo.zipCode}
        country={userInfo.country}
        phoneNumber={userInfo.phoneNumber}
        errorText={
          isDelivered ? (
            <>Dostavljeno datuma {isDelivered}</>
          ) : (
            <>Nije dostavljeno</>
          )
        }
      />
      <hr></hr>
      <PaymentMethod
        paymentMethod={paymentMethod}
        disabled={true}
        isPaid={isPaid}
      />
      <hr></hr>
      {cartItems.map((item, idx) => (
        <CartProductCard key={idx} item={item} orderCreated={true} />
      ))}
      <hr></hr>

      <div className={styles.orderCartSummaryContainer}>
        <h2>SAŽETAK NARUDŽBE</h2>
        <div>
          <b>Ukupno košarica:&nbsp;</b>&euro;{cartSubtotal}
        </div>
        <div>
          <b>Dostava:&nbsp;</b>
          Metoda dostave, &euro;8
        </div>
        <h3>
          <b>UKUPNO:&nbsp;&euro;{cartSubtotal + 8}</b>
        </h3>

        <button
          className={
            buttonDisabled ? styles.disabledButton : styles.finishOrderButton
          }
          onClick={() =>
            markAsDelivered(id)
              .then((res) => {
                if (res) {
                  setIsDelivered(true);
                }
              })
              .catch((er) =>
                console.log(
                  er.response.data.message
                    ? er.response.data.message
                    : er.response.data
                )
              )
          }
        >
          {orderButtonMessage}
        </button>
      </div>
    </div>
  );
}
