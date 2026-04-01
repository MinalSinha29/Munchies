const restaurants = [
  {
    id: "subway",
    name: "Subway",
    cuisines: ["Sandwich", "Fast Food"],
    categories: ["Quick Bites"],
    priceForTwo: 400,
    rating: 4.1,
    veg: true,
    eta: 25,
    menu: [
      { name: "Veggie Delite Sub", price: 180 },
      { name: "Paneer Tikka Sub", price: 220 },
      { name: "Aloo Patty Sub", price: 160 },
      { name: "Cold Coffee", price: 120 },
      { name: "Choco Chip Cookie", price: 80 }
    ]
  },
  {
    id: "dominos",
    name: "Domino's Pizza",
    cuisines: ["Pizza", "Italian"],
    categories: ["Pizza"],
    priceForTwo: 400,
    rating: 4.2,
    veg: true,
    eta: 30,
    menu: [
      { name: "Margherita Pizza", price: 250 },
      { name: "Farmhouse Pizza", price: 320 },
      { name: "Veg Extravaganza", price: 360 },
      { name: "Garlic Breadsticks", price: 150 },
      { name: "Pepsi (500ml)", price: 60 }
    ]
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    cuisines: ["Burger", "Fast Food"],
    categories: ["Burger"],
    priceForTwo: 450,
    rating: 4.0,
    veg: false,
    eta: 28,
    menu: [
      { name: "McAloo Tikki Burger", price: 90 },
      { name: "Chicken McGrill", price: 150 },
      { name: "McSpicy Paneer", price: 180 },
      { name: "French Fries", price: 120 },
      { name: "Coke (Medium)", price: 70 }
    ]
  },
  {
    id: "burgerking",
    name: "Burger King",
    cuisines: ["Burger", "Fast Food"],
    categories: ["Burger"],
    priceForTwo: 450,
    rating: 4.0,
    veg: false,
    eta: 30,
    menu: [
      { name: "Whopper", price: 250 },
      { name: "Crispy Veg Burger", price: 140 },
      { name: "Chicken Royale", price: 270 },
      { name: "King Fries", price: 110 },
      { name: "Chocolate Thick Shake", price: 160 }
    ]
  },
  {
    id: "pizzahut",
    name: "Pizza Hut",
    cuisines: ["Pizza"],
    categories: ["Pizza"],
    priceForTwo: 400,
    rating: 4.0,
    veg: true,
    eta: 32,
    menu: [
      { name: "Cheese Pan Pizza", price: 280 },
      { name: "Veggie Supreme", price: 320 },
      { name: "Tandoori Paneer Pizza", price: 350 },
      { name: "Garlic Breadsticks", price: 130 },
      { name: "Soft Drink Can", price: 70 }
    ]
  },
  {
    id: "gosaliasvegkitchen",
    name: "Gosalia's Veg Kitchen",
    cuisines: ["North Indian", "Vegetarian"],
    categories: ["Veg Meals"],
    priceForTwo: 500,
    rating: 4.3,
    veg: true,
    eta: 35,
    menu: [
      { name: "Paneer Butter Masala", price: 240 },
      { name: "Dal Tadka", price: 180 },
      { name: "Butter Naan", price: 50 },
      { name: "Jeera Rice", price: 120 },
      { name: "Gulab Jamun (2 pcs)", price: 80 }
    ]
  },
  {
    id: "achija",
    name: "Achija",
    cuisines: ["South Indian", "Snacks"],
    categories: ["South Indian"],
    priceForTwo: 700,
    rating: 4.4,
    veg: true,
    eta: 30,
    menu: [
      { name: "Masala Dosa", price: 160 },
      { name: "Medu Vada", price: 100 },
      { name: "Idli Sambar", price: 120 },
      { name: "Rava Dosa", price: 180 },
      { name: "Filter Coffee", price: 80 }
    ]
  },
  {
    id: "foo",
    name: "Foo",
    cuisines: ["Asian", "Sushi"],
    categories: ["Sushi"],
    priceForTwo: 2000,
    rating: 4.5,
    veg: false,
    eta: 40,
    menu: [
      { name: "California Roll", price: 480 },
      { name: "Spicy Tuna Roll", price: 520 },
      { name: "Salmon Nigiri", price: 600 },
      { name: "Edamame", price: 250 },
      { name: "Miso Soup", price: 200 }
    ]
  },
  {
    id: "sesame",
    name: "Sesame",
    cuisines: ["Asian", "Sushi"],
    categories: ["Sushi"],
    priceForTwo: 1800,
    rating: 4.5,
    veg: false,
    eta: 38,
    menu: [
      { name: "Avocado Roll", price: 450 },
      { name: "Dragon Roll", price: 550 },
      { name: "Vegetable Gyoza", price: 300 },
      { name: "Teriyaki Chicken", price: 620 },
      { name: "Jasmine Rice", price: 180 }
    ]
  },
  {
    id: "tacobell",
    name: "Taco Bell",
    cuisines: ["Mexican", "Tacos"],
    categories: ["Mexican", "Burger"],
    priceForTwo: 700,
    rating: 4.1,
    veg: false,
    eta: 30,
    menu: [
      { name: "Crispy Chicken Taco", price: 200 },
      { name: "Veg Mexican Rice Bowl", price: 250 },
      { name: "Nachos with Cheese", price: 180 },
      { name: "Quesadilla", price: 220 },
      { name: "Iced Tea", price: 90 }
    ]
  },
  {
    id: "madrascafe",
    name: "Madras Cafe",
    cuisines: ["South Indian"],
    categories: ["South Indian"],
    priceForTwo: 800,
    rating: 4.2,
    veg: true,
    eta: 30,
    menu: [
      { name: "Plain Dosa", price: 120 },
      { name: "Rava Idli", price: 130 },
      { name: "Onion Uttapam", price: 150 },
      { name: "Filter Coffee", price: 80 },
      { name: "Pongal", price: 180 }
    ]
  },
  {
    id: "delhidarbar",
    name: "Delhi Darbar",
    cuisines: ["Mughlai", "Biryani"],
    categories: ["Biryani"],
    priceForTwo: 1400,
    rating: 4.3,
    veg: false,
    eta: 36,
    menu: [
      { name: "Chicken Biryani", price: 350 },
      { name: "Mutton Rogan Josh", price: 420 },
      { name: "Butter Naan", price: 50 },
      { name: "Paneer Tikka", price: 280 },
      { name: "Phirni", price: 100 }
    ]
  },
  {
    id: "persiandarbar",
    name: "Persian Darbar",
    cuisines: ["Mughlai", "Biryani"],
    categories: ["Biryani"],
    priceForTwo: 1400,
    rating: 4.2,
    veg: false,
    eta: 36,
    menu: [
      { name: "Chicken Biryani", price: 340 },
      { name: "Mutton Seekh Kebab", price: 400 },
      { name: "Paneer Makhani", price: 260 },
      { name: "Butter Naan", price: 50 },
      { name: "Caramel Custard", price: 120 }
    ]
  },
  {
    id: "minipunjab",
    name: "Mini Punjab",
    cuisines: ["North Indian", "Biryani"],
    categories: ["Biryani"],
    priceForTwo: 1400,
    rating: 4.3,
    veg: false,
    eta: 35,
    menu: [
      { name: "Paneer Handi", price: 280 },
      { name: "Butter Chicken", price: 340 },
      { name: "Veg Pulao", price: 180 },
      { name: "Naan", price: 40 },
      { name: "Gulab Jamun", price: 80 }
    ]
  },
  {
    id: "bananaleaf",
    name: "Banana Leaf",
    cuisines: ["South Indian"],
    categories: ["South Indian"],
    priceForTwo: 800,
    rating: 4.3,
    veg: true,
    eta: 32,
    menu: [
      { name: "Ghee Roast Dosa", price: 180 },
      { name: "Mini Idli with Sambar", price: 130 },
      { name: "Rava Masala Dosa", price: 190 },
      { name: "Pongal", price: 160 },
      { name: "Filter Coffee", price: 80 }
    ]
  },
  {
    id: "chilis",
    name: "Chili's",
    cuisines: ["Tex-Mex", "American"],
    categories: ["Casual Dining"],
    priceForTwo: 2000,
    rating: 4.2,
    veg: false,
    eta: 45,
    menu: [
      { name: "Loaded Nachos", price: 380 },
      { name: "Classic Chicken Wings", price: 420 },
      { name: "Veg Quesadilla", price: 340 },
      { name: "BBQ Ribs", price: 520 },
      { name: "Chocolate Lava Cake", price: 220 }
    ]
  },
  {
    id: "kfc",
    name: "KFC",
    cuisines: ["Chicken", "Fast Food"],
    categories: ["Burger"],
    priceForTwo: 700,
    rating: 4.0,
    veg: false,
    eta: 28,
    menu: [
      { name: "Zinger Burger", price: 210 },
      { name: "Popcorn Chicken", price: 190 },
      { name: "Chicken Bucket (4 pcs)", price: 450 },
      { name: "French Fries", price: 120 },
      { name: "Pepsi Can", price: 70 }
    ]
  }
];

export default restaurants;
