import CartProductCard from "../CartProductCard";
import DiscountCode from "../DiscountCode";
import DeliveryMethod from "../DeliveryMethod";
import Subtotal from "../Subtotal";
import styles from "./style.module.css";

export default function CartComponent({
  addToCart,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}) {
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Sigurno želite ukloniti proizvod iz košarice?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "4rem" }}>
      <h2>KOŠARICA</h2>
      {cartItems.length === 0 ? (
        <div className={styles.successAlert}>Vaša košarica je prazna.</div>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <CartProductCard
              key={idx}
              item={item}
              changeCount={changeCount}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
        </>
      )}

      <hr></hr>
      <DiscountCode />
      <hr></hr>
      <h3>DOSTAVA</h3>
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
      <Subtotal cartSubtotal={cartSubtotal} />
    </div>
  );
}
