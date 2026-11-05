import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "Jhon",
      email: "admin@gmail.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "Jane",
      email: "user@gmail.com",
      password: hashSync("123456", 10),
      role: "user",
    }
  ],
  products: [
    {
      name: "Marseille — maillot bleu",
      slug: "marseille-bleu",
      category: "Maillot de football",
      description: "Maillot bleu de Marseille avec écusson du club et détails dorés.",
      images: [
        "/images/sample-products/mr1.jpg",
        "/images/sample-products/mr2.jpg",
        "/images/sample-products/mr3.jpg",
        "/images/sample-products/mr4.jpg",
      ],
      price: 249,
      brand: "Puma",
      rating: 0,
      stock: 5,
      isFeatured: true,
      banner: null,
    },
    {
      name: "Real Madrid — maillot gris",
      slug: "real-madrid-gris",
      category: "Maillot de football",
      description: "Maillot gris du Real Madrid avec écusson et bandes aux épaules.",
      images: [
        "/images/sample-products/rab1.jpg",
        "/images/sample-products/rab2.jpg",
        "/images/sample-products/rab3.jpg",
      ],
      price: 249,
      brand: "Adidas",
      rating: 0,
      stock: 5,
      isFeatured: false,
      banner: null,
    },
    {
      name: "FC Barcelone — maillot blaugrana",
      slug: "barcelone",
      category: "Maillot de football",
      description: "Maillot du FC Barcelone aux couleurs bleue et grenat du club.",
      images: [
        "/images/sample-products/ba1.jpg",
        "/images/sample-products/ba2.jpg",
        "/images/sample-products/ba3.jpg",
      ],
      price: 249,
      brand: "Nike",
      rating: 0,
      stock: 5,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Real Madrid — maillot blanc",
      slug: "real-madrid-blanc",
      category: "Maillot de football",
      description: "Maillot blanc du Real Madrid avec écusson et détails noirs.",
      images: [
        "/images/sample-products/r1.jpg",
        "/images/sample-products/R2.jpg",
        "/images/sample-products/r3.jpg",
      ],
      price: 249,
      brand: "Adidas",
      rating: 0,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
  ],
};

export default sampleData;
