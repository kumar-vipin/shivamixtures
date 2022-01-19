import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Vipin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Varsha",
      email: "varsha@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "product 1",
      category: "xyz",
      brand: 'Nike',
      price: 20,
      countInStock: 12,
      description: 'hello product 1',
      image: "/images/p1.jpg",
    },
    {
      name: "product 2",
      category: "xyz",
      brand: 'Nike',
      price: 10,
      countInStock: 2,
      description: 'hello product 2',
      image: "/images/p2.jpg",
    },
    {
      name: "product 3",
      category: "xyz",
      brand: 'Nike',
      price: 13,
      countInStock: 5,
      description: 'hello product 3',
      image: "/images/p3.jpg",
    },
    {
      name: "product 4",
      category: "xyz",
      brand: 'Nike',
      price: 16,
      countInStock: 8,
      description: 'hello product 4',
      image: "/images/p4.jpg",
    },
    {
      name: "product 5",
      category: "xyz",
      brand: 'Nike',
      price: 11,
      countInStock: 3,
      description: 'hello product 5',
      image: "/images/p5.jpg",
    },
    {
      name: "product 6",
      category: "xyz",
      brand: 'Nike',
      price: 17,
      countInStock: 6,
      description: 'hello product 6',
      image: "/images/p6.jpg",
    },
    {
      name: "product 7",
      category: "xyz",
      brand: 'Nike',
      price: 7,
      countInStock: 7,
      description: 'hello product 7',
      image: "/images/p7.jpg",
    },
  ],
};

export default data;
