import DeliveryDetails from "../DeliveryDetails";
import PaymentMethod from "../PaymentMethod";
import CartProductCard from "../CartProductCard";
import OrderCartSummary from "../OrderCartSummary";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserOrderDetailsPage({
  userInfo,
  getUser,
  getOrder,
  loadPayPalScript,
}) {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Platite narudžbu");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const paypalContainer = useRef();
  //console.log(paypalContainer);

  const { id } = useParams();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((err) => console.log(err));
  }, [getUser]);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Vaša narudžba je završena.");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Platite narudžbu.");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage(
              "Pričekajte pošiljku. Plaćate pri preuzeću pošiljke."
            );
          }
        }
      })
      .catch((err) => console.log(err));
  }, [getOrder, id]);

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage(
        "Za plaćanje narudžbe kliknite na jedno od dugmadi ispod"
      );
      if (!isPaid) {
        //id from url
        loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Hvala Vam na narudžbi. Narudžba je zaprimljena.");
    }
  };

  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Zahvaljujemo na plaćanju!");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    //to hide the paypal buttons after order is paid
    paypalContainer.current.style = "display: none";
  };

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h2>DETALJI NARUDŽBE</h2>
      <hr></hr>
      <DeliveryDetails
        name={userInfo.name}
        lastName={userInfo.lastName}
        address={userAddress.address}
        city={userAddress.city}
        country={userAddress.country}
        zipCode={userAddress.zipCode}
        phoneNumber={userAddress.phoneNumber}
        errorText={"Nije dostavljeno."}
        isDelivered={isDelivered}
      />
      <hr></hr>
      <PaymentMethod
        paymentMethod={paymentMethod}
        disabled={true}
        isPaid={isPaid}
      />
      <hr></hr>
      {cartItems.map((item, idx) => (
        <CartProductCard
          item={item}
          key={idx}
          //order created means it can't be changed
          orderCreated={true}
        />
      ))}
      <OrderCartSummary
        cartSubtotal={cartSubtotal}
        deliveryMethod={"Metoda 3"}
        deliveryPrice={"8"}
        orderHandler={orderHandler}
        buttonDisabled={buttonDisabled}
        orderButtonMessage={orderButtonMessage}
      />
      <div ref={paypalContainer} id="paypal-container-element"></div>
    </div>
  );
}
