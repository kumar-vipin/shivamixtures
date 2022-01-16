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
      _id: "1",
      name: "product 1",
      category: "xyz",
      image: "/images/p1.jpg",
    },
    {
      _id: "2",
      name: "product 2",
      category: "xyz",
      image: "/images/p2.jpg",
    },
    {
      _id: "3",
      name: "product 3",
      category: "xyz",
      image: "/images/p3.jpg",
    },
    {
      _id: "4",
      name: "product 4",
      category: "xyz",
      image: "/images/p4.jpg",
    },
    {
      _id: "5",
      name: "product 5",
      category: "xyz",
      image: "/images/p5.jpg",
    },
  ],
};

export default data;
