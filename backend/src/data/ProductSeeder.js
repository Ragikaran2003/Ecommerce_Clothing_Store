const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");

dotenv.config();
connectDB();

const demoProducts = [
  {
    "id": 1,
    "name": "Luxury Chronograph Watch",
    "image": "7.jpg",
    "description": "A premium luxury analog watch featuring a genuine brown leather strap, intricate moon phase display, and a durable stainless steel case.",
    "price": 3500,
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 2,
    "name": "Abstract Print V-Neck Blouse",
    "image": "15.jpg",
    "description": "Chic black long-sleeve blouse with a stylish white abstract print and a V-neckline, made from lightweight fabric suitable for office or casual wear.",
    "price": 1350,
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 3,
    "name": "Kids Winter Bear 3-Piece Set",
    "image": "17.jpg",
    "description": "Adorable pink winter clothing set for kids including a hooded fleece vest, a long-sleeve sweatshirt with a bear patch, and matching warm trousers.",
    "price": 1800,
    "category": "Kids",
    "sizes": ["S", "M", "L"]
  },
  {
    "id": 4,
    "name": "Casual Zip-Up Hoodie",
    "image": "1.jpg",
    "description": "A comfortable and stylish grey zip-up hoodie made from a high-quality cotton fleece blend, featuring a drawstring hood and kangaroo pockets.",
    "price": 1250,
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 5,
    "name": "Heartbeat Hoodie Tracksuit",
    "image": "12.jpg",
    "description": "Casual pink hoodie and black sweatpants set featuring a cute heartbeat graphic print, designed for lounging, jogging, or everyday casual comfort.",
    "price": 1500,
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 6,
    "name": "Tactical Camo Cap",
    "image": "8.jpg",
    "description": "Rugged camouflage baseball cap designed with a tactical flag patch, breathable fabric, and a structured brim for sun protection.",
    "price": 1050,
    "category": "Men",
    "sizes": ["S", "M", "L"]
  },
  {
    "id": 7,
    "name": "Kids Cartoon Sweatshirt Set",
    "image": "18.jpg",
    "description": "A vibrant red sweatshirt featuring a cute cartoon superhero print, paired with comfortable black joggers, perfect for active kids and playtime.",
    "price": 1250,
    "category": "Kids",
    "sizes": ["S", "M", "L"]
  },
  {
    "id": 8,
    "name": "Tactical Cargo Joggers",
    "image": "5.jpg",
    "description": "Streetwear style cargo jogger pants available in black and grey, featuring multiple functional utility pockets and elastic cuffs.",
    "price": 1600,
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 9,
    "name": "Yellow Floral Button-Down Shirt",
    "image": "16.jpg",
    "description": "Bright and cheerful yellow button-down shirt featuring a beautiful blue floral pattern and long sleeves, adding a pop of color to your wardrobe.",
    "price": 1200,
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 10,
    "name": "Fingerless Gym Gloves",
    "image": "6.jpg",
    "description": "Heavy-duty fingerless workout gloves designed with padded palms for superior grip, breathable mesh material, and adjustable wrist straps.",
    "price": 1050,
    "category": "Men",
    "sizes": ["S", "M", "L"]
  },
  {
    "id": 11,
    "name": "Knitted Dress & Crop Hoodie Set",
    "image": "20.jpg",
    "description": "Trendy olive green two-piece set featuring a sleeveless ribbed knit dress and a matching long-sleeve cropped hoodie for a unique fashion statement.",
    "price": 1750,
    "category": "Women",
    "sizes": ["S", "M", "L"]
  },
  {
    "id": 12,
    "name": "Color Block Long Sleeve Polo",
    "image": "3.jpg",
    "description": "Trendy long-sleeve polo shirt featuring a bold color-block design with red, white, and grey stripes, crafted from soft breathable fabric.",
    "price": 1100,
    "category": "Men",
    "sizes": ["M", "L", "XL"]
  },
  {
    "id": 13,
    "name": "Kids Sporty Black Tracksuit",
    "image": "19.jpg",
    "description": "Cool black hooded sweatshirt and jogger pants set for kids featuring a bold red sports logo, made from soft fabric for all-day activity.",
    "price": 1400,
    "category": "Kids",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 14,
    "name": "Ribbed Knit Turtleneck Sweater",
    "image": "11.jpg",
    "description": "Classic white ribbed knit turtleneck sweater that offers a snug and warm fit, perfect for layering under coats or wearing with jeans in winter.",
    "price": 1150,
    "category": "Women",
    "sizes": ["S", "M", "L"]
  },
  {
    "id": 15,
    "name": "Winter Fur-Lined Beanie",
    "image": "4.jpg",
    "description": "Essential winter knit beanie hat lined with thick soft fur for extra warmth, featuring a stylish leather label patch and a slouchy fit.",
    "price": 1000,
    "category": "Men",
    "sizes": ["M", "L", "XL"]
  },
  {
    "id": 16,
    "name": "Geometric Striped Tunic Top",
    "image": "14.jpg",
    "description": "Modern black and beige geometric striped tunic top with long sleeves, featuring a loose fit and elegant design that pairs perfectly with white trousers.",
    "price": 1250,
    "category": "Women",
    "sizes": ["M", "L", "XL"]
  },
  {
    "id": 17,
    "name": "Classic Leather Wallet",
    "image": "9.jpg",
    "description": "Elegant bifold leather wallet available in dark brown and black, featuring detailed contrast stitching, multiple card slots, and a slim profile.",
    "price": 1200,
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 18,
    "name": "Asymmetrical Button Tunic",
    "image": "13.jpg",
    "description": "Stylish red long-sleeve tunic top featuring a textured fabric, decorative side buttons, and a chic asymmetrical hemline for a modern look.",
    "price": 1300,
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 19,
    "name": "Formal Leather Belt",
    "image": "10.jpg",
    "description": "Durable and stylish leather belt paired with a modern matte black anti-scratch buckle, designed to provide a secure fit and elevate your jeans.",
    "price": 1100,
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"]
  },
  {
    "id": 20,
    "name": "Textured Zip-Neck Polo",
    "image": "2.jpg",
    "description": "Modern grey ribbed polo shirt featuring a unique zipper neckline instead of buttons, offering a muscle-fit look for casual outings.",
    "price": 1300,
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"]
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(demoProducts);
    console.log("Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;