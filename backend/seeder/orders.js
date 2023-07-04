const ObjectId = require("mongodb").ObjectId;

const orders = [
  {
    user: new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
      itemsCount: 4,
      cartSubtotal: 800,
    },
    cartItems: [
      {
        name: "Parfem Miris proljeća",
        price: 350,
        image: { path: "/images/parfem1.jpg" },
        quantity: 2,
        count: 10,
      },
      {
        name: "Šampon za njegu kose",
        price: 50,
        image: { path: "/images/kosa1.jpg" },
        quantity: 2,
        count: 20,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-07-14T12:12:36.490+00:00`,
  },
  {
    user: new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
      itemsCount: 2,
      cartSubtotal: 700,
    },
    cartItems: [
      {
        name: "Parfem Miris proljeća",
        price: 350,
        image: { path: "/images/parfem1.jpg" },
        quantity: 2,
        count: 10,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-03-20T09:12:36.490+00:00`,
  },
  {
    user: new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
      itemsCount: 5,
      cartSubtotal: 980,
    },
    cartItems: [
      {
        name: "Parfem Miris proljeća",
        price: 350,
        image: { path: "/images/parfem1.jpg" },
        quantity: 2,
        count: 10,
      },
      {
        name: "Serum za lice Hidratantni",
        price: 180,
        image: { path: "/images/lice2.jpg" },
        quantity: 1,
        count: 18,
      },
      {
        name: "Šampon za njegu kose",
        price: 50,
        image: { path: "/images/kosa1.jpg" },
        quantity: 2,
        count: 20,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-12-04T12:02:36.490+00:00`,
  },
  {
    user: new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
      itemsCount: 4,
      cartSubtotal: 800,
    },
    cartItems: [
      {
        name: "Parfem Miris proljeća",
        price: 350,
        image: { path: "/images/parfem1.jpg" },
        quantity: 2,
        count: 10,
      },
      {
        name: "Šampon za njegu kose",
        price: 50,
        image: { path: "/images/kosa1.jpg" },
        quantity: 2,
        count: 20,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-07-14T12:12:36.490+00:00`,
  },
  {
    user: new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
      itemsCount: 2,
      cartSubtotal: 700,
    },
    cartItems: [
      {
        name: "Parfem Miris proljeća",
        price: 350,
        image: { path: "/images/parfem1.jpg" },
        quantity: 2,
        count: 10,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-03-20T09:12:36.490+00:00`,
  },
  {
    user: new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
      itemsCount: 5,
      cartSubtotal: 980,
    },
    cartItems: [
      {
        name: "Parfem Miris proljeća",
        price: 350,
        image: { path: "/images/parfem1.jpg" },
        quantity: 2,
        count: 10,
      },
      {
        name: "Serum za lice Hidratantni",
        price: 180,
        image: { path: "/images/lice2.jpg" },
        quantity: 1,
        count: 18,
      },
      {
        name: "Šampon za njegu kose",
        price: 50,
        image: { path: "/images/kosa1.jpg" },
        quantity: 2,
        count: 20,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-12-04T12:02:36.490+00:00`,
  },
];

module.exports = orders;
