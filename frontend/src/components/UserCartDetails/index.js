import DeliveryDetails from "../DeliveryDetails";
//import PaymentMethod from "../PaymentMethod";
import OrderCartSummary from "../OrderCartSummary";
import CartProductCard from "../CartProductCard";
import DeliveryMethod from "../DeliveryMethod";
import DiscountCode from "../DiscountCode";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../PaymentMethod";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function UserCartDetails({
  cartItems,
  itemsCount,
  cartSubtotal,
  userInfo,
  addToCart,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pp");
  const navigate = useNavigate();

  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };
  const removeFromCartHandler = (productID, quantity, price) => {
    if (
      window.confirm(
        "Jeste li sigurni da želite ukloniti proizvod iz košarice?"
      )
    ) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        //if validation is not successful
        if (
          !data.address ||
          !data.city ||
          !data.country ||
          !data.zipCode ||
          !data.phoneNumber
        ) {
          setButtonDisabled(true);
          setMissingAddress(
            " Trebate ispuniti Vaš profil s točnim informacijama."
          );
        } else {
          setUserAddress({
            address: data.address,
            city: data.city,
            country: data.country,
            zipCode: data.zipCode,
            phoneNumber: data.phoneNumber,
          });
          setMissingAddress(false);
        }
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id, getUser]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate("/user/order-details/" + data._id);
        }
      })
      .catch((err) => console.log(err));
  };

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2rem" }}>
      <h2>KOŠARICA</h2>
      {cartItems.length === 0 ? (
        <>
          <div className={styles.successAlert}>Vaša košarica je prazna</div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={() => navigate("/product-list")}
            >
              Istražite proizvode &nbsp;&nbsp;
              <BsFillArrowRightCircleFill
                className={styles.icon}
                style={{ height: "1.7rem", width: "1.7rem" }}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            {cartItems.map((item, idx) => (
              <CartProductCard
                item={item}
                key={idx}
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
              />
            ))}
          </div>
          <hr></hr>
          <DeliveryDetails
            name={userInfo.name}
            lastName={userInfo.lastName}
            address={userAddress.address}
            zipCode={userAddress.zipCode}
            city={userAddress.city}
            country={userAddress.country}
            phoneNumber={userAddress.phoneNumber}
            missingAddress={missingAddress}
          />
          <DeliveryMethod
            title={"Paket 24"}
            description={"Isporuka više od 97% paketa za manje od 24 sata."}
            price={"5"}
          />
          <DeliveryMethod
            title={"DHL"}
            description={"Isporuka unutar 5 radnih dana."}
            price={"6"}
          />
          <DeliveryMethod
            title={"Overseas Express"}
            description={"Isporuka unutar 3 radna dana."}
            price={"7"}
          />
          <hr></hr>
          <PaymentMethod choosePayment={choosePayment} isPaid={false} />
          <hr></hr>
          <DiscountCode />

          <hr></hr>
          <OrderCartSummary
            cartSubtotal={cartSubtotal}
            deliveryMethod={"Metoda 2"}
            deliveryPrice={"8"}
            buttonDisabled={buttonDisabled}
            orderHandler={orderHandler}
            orderButtonMessage={"Platite narudžbu"}
          />
        </>
      )}
    </div>
  );
}
