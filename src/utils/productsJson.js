import image from "../assets/images/product_example.webp";
export const products = [
  {
    id: 1,
    title: "Mochila Switch 2",
    description:
      "Una mochila donde cabe el switch 2, dock, cargador, cable HDMI, accesorios y otros elementos",
    image: image,
    categoryIds: [2, 3],
    tagIds: [1],
    price: 25.0,
    discountPrice: null,
    featured: true,
  },
];

export const categories = [
  {
    id: 1,
    title: "Nintendo Switch",
  },
  {
    id: 2,
    title: "Nintendo Switch 2",
  },
  {
    id: 3,
    title: "Estuches",
  },
  {
    id: 4,
    title: "Repuestos",
  },
  {
    id: 5,
    title: "Accesorios",
  },
];

export const tags = [
  {
    id: 1,
    title: "Más vendido",
  },
  {
    id: 2,
    title: "normal",
  },
];
