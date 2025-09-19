const items = [
  // Electronics
  {
    id: 101,
    ProductName: "iPhone 16 Pro",
    ProductDesc: "Latest iPhone with A19 chip and titanium build.",
    Price: 129999,
    Image: "https://picsum.photos/200?random=101",
    dateAdded: "2025-09-01",
    Category: "Electronics",
    rating: 4.8,
  },
  {
    id: 102,
    ProductName: "Samsung Galaxy Z Fold 6",
    ProductDesc: "Foldable smartphone with cutting-edge design.",
    Price: 149999,
    Image: "https://picsum.photos/200?random=102",
    dateAdded: "2025-09-01",
    Category: "Electronics",
    rating: 4.6,
  },
  {
    id: 103,
    ProductName: "Sony WH-1000XM6",
    ProductDesc: "Noise-cancelling wireless headphones.",
    Price: 29999,
    Image: "https://picsum.photos/200?random=103",
    dateAdded: "2025-09-01",
    Category: "Electronics",
    rating: 4.7,
  },
  {
    id: 104,
    ProductName: "MacBook Air M4",
    ProductDesc: "Lightweight laptop with Apple M4 chip.",
    Price: 139999,
    Image: "https://picsum.photos/200?random=104",
    dateAdded: "2025-09-01",
    Category: "Electronics",
    rating: 4.9,
  },
  {
    id: 105,
    ProductName: "iPad Pro 14",
    ProductDesc: "Large screen iPad with OLED display.",
    Price: 89999,
    Image: "https://picsum.photos/200?random=105",
    dateAdded: "2025-09-01",
    Category: "Electronics",
    rating: 4.5,
  },

  // Clothes
  {
    id: 201,
    ProductName: "Graphic T-Shirt",
    ProductDesc: "Cotton T-shirt with modern print.",
    Price: 1999,
    Image: "https://picsum.photos/200?random=201",
    dateAdded: "2025-09-02",
    Category: "Clothes",
    rating: 4.2,
  },
  {
    id: 202,
    ProductName: "Denim Jeans",
    ProductDesc: "Slim fit stretchable denim.",
    Price: 3999,
    Image: "https://picsum.photos/200?random=202",
    dateAdded: "2025-09-02",
    Category: "Clothes",
    rating: 4.3,
  },
  {
    id: 203,
    ProductName: "Leather Jacket",
    ProductDesc: "Classic biker leather jacket.",
    Price: 9999,
    Image: "https://picsum.photos/200?random=203",
    dateAdded: "2025-09-02",
    Category: "Clothes",
    rating: 4.6,
  },
  {
    id: 204,
    ProductName: "Sneakers",
    ProductDesc: "White sneakers for casual wear.",
    Price: 4999,
    Image: "https://picsum.photos/200?random=204",
    dateAdded: "2025-09-02",
    Category: "Clothes",
    rating: 4.4,
  },
  {
    id: 205,
    ProductName: "Hoodie",
    ProductDesc: "Warm fleece hoodie with zipper.",
    Price: 2999,
    Image: "https://picsum.photos/200?random=205",
    dateAdded: "2025-09-02",
    Category: "Clothes",
    rating: 4.1,
  },

  // Food
  {
    id: 301,
    ProductName: "Margherita Pizza",
    ProductDesc: "Classic pizza with mozzarella cheese.",
    Price: 899,
    Image: "https://picsum.photos/200?random=301",
    dateAdded: "2025-09-03",
    Category: "Food",
    rating: 4.8,
  },
  {
    id: 302,
    ProductName: "Cheese Burger",
    ProductDesc: "Juicy beef burger with cheese slice.",
    Price: 499,
    Image: "https://picsum.photos/200?random=302",
    dateAdded: "2025-09-03",
    Category: "Food",
    rating: 4.6,
  },
  {
    id: 303,
    ProductName: "Pasta Alfredo",
    ProductDesc: "Creamy Alfredo pasta with herbs.",
    Price: 699,
    Image: "https://picsum.photos/200?random=303",
    dateAdded: "2025-09-03",
    Category: "Food",
    rating: 4.4,
  },
  {
    id: 304,
    ProductName: "Chocolate Ice Cream",
    ProductDesc: "Rich chocolate flavored ice cream.",
    Price: 299,
    Image: "https://picsum.photos/200?random=304",
    dateAdded: "2025-09-03",
    Category: "Food",
    rating: 4.9,
  },
  {
    id: 305,
    ProductName: "Latte Coffee",
    ProductDesc: "Freshly brewed latte with milk foam.",
    Price: 199,
    Image: "https://picsum.photos/200?random=305",
    dateAdded: "2025-09-03",
    Category: "Food",
    rating: 4.5,
  },

  // Home Appliances
  {
    id: 401,
    ProductName: "Microwave Oven",
    ProductDesc: "25L oven with smart controls.",
    Price: 11999,
    Image: "https://picsum.photos/200?random=401",
    dateAdded: "2025-09-04",
    Category: "Home Appliances",
    rating: 4.3,
  },
  {
    id: 402,
    ProductName: "Refrigerator",
    ProductDesc: "Smart inverter double door fridge.",
    Price: 54999,
    Image: "https://picsum.photos/200?random=402",
    dateAdded: "2025-09-04",
    Category: "Home Appliances",
    rating: 4.6,
  },
  {
    id: 403,
    ProductName: "Washing Machine",
    ProductDesc: "Automatic washing machine 7kg.",
    Price: 32999,
    Image: "https://picsum.photos/200?random=403",
    dateAdded: "2025-09-04",
    Category: "Home Appliances",
    rating: 4.5,
  },
  {
    id: 404,
    ProductName: "Air Conditioner",
    ProductDesc: "1.5 ton AC with turbo cooling.",
    Price: 42999,
    Image: "https://picsum.photos/200?random=404",
    dateAdded: "2025-09-04",
    Category: "Home Appliances",
    rating: 4.4,
  },
  {
    id: 405,
    ProductName: "Vacuum Cleaner",
    ProductDesc: "Bagless vacuum cleaner with HEPA filter.",
    Price: 7999,
    Image: "https://picsum.photos/200?random=405",
    dateAdded: "2025-09-04",
    Category: "Home Appliances",
    rating: 4.2,
  },

  // Sports & Fitness
  {
    id: 501,
    ProductName: "Dumbbell Set",
    ProductDesc: "Adjustable dumbbells 20kg set.",
    Price: 4999,
    Image: "https://picsum.photos/200?random=501",
    dateAdded: "2025-09-05",
    Category: "Sports & Fitness",
    rating: 4.6,
  },
  {
    id: 502,
    ProductName: "Yoga Mat",
    ProductDesc: "Eco-friendly non-slip yoga mat.",
    Price: 1999,
    Image: "https://picsum.photos/200?random=502",
    dateAdded: "2025-09-05",
    Category: "Sports & Fitness",
    rating: 4.3,
  },
  {
    id: 503,
    ProductName: "Treadmill",
    ProductDesc: "Foldable treadmill with app control.",
    Price: 39999,
    Image: "https://picsum.photos/200?random=503",
    dateAdded: "2025-09-05",
    Category: "Sports & Fitness",
    rating: 4.7,
  },
  {
    id: 504,
    ProductName: "Football",
    ProductDesc: "Durable stitched football for outdoor.",
    Price: 999,
    Image: "https://picsum.photos/200?random=504",
    dateAdded: "2025-09-05",
    Category: "Sports & Fitness",
    rating: 4.2,
  },
  {
    id: 505,
    ProductName: "Cycling Helmet",
    ProductDesc: "Lightweight helmet with airflow design.",
    Price: 2499,
    Image: "https://picsum.photos/200?random=505",
    dateAdded: "2025-09-05",
    Category: "Sports & Fitness",
    rating: 4.5,
  },
];
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_STRING;

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Product.deleteMany(); // clear old
    await Product.insertMany(items); // insert new

    console.log("Sample products inserted ✅");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
