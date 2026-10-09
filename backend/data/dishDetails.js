// backend/data/dishDetails.js
// Extra details for every dish, used by seed.js and (later) the AI assistant.
// NOTE: this is sample data written for the project. Review it and edit it so
// you can stand behind every line in an interview.
//
// D(isVeg, spiceLevel 0-3, category, description, "ingredients", "allergens")
const D = (veg, spice, category, description, ingredients, allergens) => ({
  veg,
  spiceLevel: spice,
  category,
  description,
  ingredients: ingredients.split(",").map((s) => s.trim()).filter(Boolean),
  allergens: allergens ? allergens.split(",").map((s) => s.trim()) : [],
});

const dishDetails = {
  // ---- Subway ----
  "Veggie Delite Sub": D(true, 0, "Sandwich", "Fresh veggie sub with crisp salad.", "bread, lettuce, tomato, cucumber, onion, capsicum, olives, mayo-free dressing", "gluten"),
  "Paneer Tikka Sub": D(true, 2, "Sandwich", "Grilled paneer tikka in a toasted sub.", "bread, paneer, tikka marinade, onion, capsicum, mint sauce", "gluten, dairy"),
  "Aloo Patty Sub": D(true, 1, "Sandwich", "Spiced potato patty sub with salad.", "bread, potato patty, lettuce, tomato, onion, sauce", "gluten"),
  "Cold Coffee": D(true, 0, "Beverage", "Chilled sweet coffee with milk.", "coffee, milk, sugar, ice", "dairy"),
  "Choco Chip Cookie": D(true, 0, "Dessert", "Soft baked cookie with chocolate chips.", "flour, butter, sugar, chocolate chips", "gluten, dairy"),

  // ---- Domino's ----
  "Margherita Pizza": D(true, 0, "Pizza", "Classic cheese pizza with tomato sauce.", "pizza base, tomato sauce, mozzarella", "gluten, dairy"),
  "Farmhouse Pizza": D(true, 1, "Pizza", "Loaded veg pizza with onion, capsicum, tomato and mushroom.", "pizza base, mozzarella, onion, capsicum, tomato, mushroom", "gluten, dairy"),
  "Veg Extravaganza": D(true, 1, "Pizza", "Pizza topped with olives, corn, jalapeno, onion and paneer.", "pizza base, mozzarella, olives, corn, jalapeno, onion, paneer", "gluten, dairy"),
  "Garlic Breadsticks": D(true, 0, "Sides", "Baked breadsticks brushed with garlic butter.", "flour, garlic, butter, herbs", "gluten, dairy"),
  "Pepsi (500ml)": D(true, 0, "Beverage", "Chilled cola, 500 ml bottle.", "carbonated water, sugar, flavouring", ""),

  // ---- McDonald's ----
  "McAloo Tikki Burger": D(true, 1, "Burger", "Spiced potato and pea patty burger.", "bun, potato patty, onion, tomato, sauce", "gluten, egg"),
  "Chicken McGrill": D(false, 1, "Burger", "Grilled chicken patty burger with sauce.", "bun, chicken patty, lettuce, sauce", "gluten, egg"),
  "McSpicy Paneer": D(true, 2, "Burger", "Crispy spicy paneer burger.", "bun, paneer patty, lettuce, spicy sauce", "gluten, dairy, egg"),
  "French Fries": D(true, 0, "Sides", "Crispy salted fries.", "potato, oil, salt", ""),
  "Coke (Medium)": D(true, 0, "Beverage", "Chilled cola, medium cup.", "carbonated water, sugar, flavouring", ""),

  // ---- Burger King ----
  "Whopper": D(false, 0, "Burger", "Large flame-grilled chicken burger with salad.", "bun, chicken patty, lettuce, tomato, onion, mayo", "gluten, egg"),
  "Crispy Veg Burger": D(true, 1, "Burger", "Crispy veg patty burger.", "bun, veg patty, lettuce, mayo", "gluten, egg"),
  "Chicken Royale": D(false, 1, "Burger", "Crispy chicken burger with creamy sauce.", "bun, fried chicken, lettuce, mayo", "gluten, egg"),
  "King Fries": D(true, 0, "Sides", "Thick-cut salted fries.", "potato, oil, salt", ""),
  "Chocolate Thick Shake": D(true, 0, "Beverage", "Thick chocolate milkshake.", "milk, ice cream, chocolate syrup", "dairy"),

  // ---- Pizza Hut ----
  "Cheese Pan Pizza": D(true, 0, "Pizza", "Thick pan pizza loaded with cheese.", "pizza base, tomato sauce, mozzarella", "gluten, dairy"),
  "Veggie Supreme": D(true, 1, "Pizza", "Pan pizza with mixed vegetables and cheese.", "pizza base, mozzarella, onion, capsicum, mushroom, corn, olives", "gluten, dairy"),
  "Tandoori Paneer Pizza": D(true, 2, "Pizza", "Pizza topped with tandoori paneer and onion.", "pizza base, mozzarella, paneer, tandoori marinade, onion, capsicum", "gluten, dairy"),
  "Soft Drink Can": D(true, 0, "Beverage", "Chilled soft drink can.", "carbonated water, sugar, flavouring", ""),

  // ---- Gosalia's Veg Kitchen ----
  "Paneer Butter Masala": D(true, 1, "Main Course", "Paneer cubes in a creamy tomato and butter gravy.", "paneer, tomato, butter, cream, cashew, spices", "dairy, nuts"),
  "Dal Tadka": D(true, 1, "Main Course", "Yellow lentils tempered with garlic, cumin and chilli.", "toor dal, garlic, cumin, chilli, ghee", "dairy"),
  "Butter Naan": D(true, 0, "Bread", "Soft tandoor-baked naan brushed with butter.", "refined flour, yogurt, butter", "gluten, dairy"),
  "Jeera Rice": D(true, 0, "Rice", "Basmati rice tempered with cumin.", "basmati rice, cumin, ghee", "dairy"),
  "Gulab Jamun (2 pcs)": D(true, 0, "Dessert", "Two milk-solid dumplings in sugar syrup.", "milk solids, flour, sugar, cardamom", "gluten, dairy"),

  // ---- Achija ----
  "Masala Dosa": D(true, 1, "South Indian", "Crispy rice crepe filled with spiced potato.", "rice batter, urad dal, potato, onion, mustard seeds", ""),
  "Medu Vada": D(true, 1, "Snack", "Crispy fried lentil doughnuts served with chutney.", "urad dal, black pepper, curry leaves, ginger", ""),
  "Idli Sambar": D(true, 1, "South Indian", "Steamed rice cakes with lentil and vegetable sambar.", "rice batter, urad dal, toor dal, vegetables, tamarind", ""),
  "Rava Dosa": D(true, 1, "South Indian", "Thin crispy semolina dosa.", "semolina, rice flour, onion, green chilli, cumin", "gluten"),
  "Filter Coffee": D(true, 0, "Beverage", "South Indian style hot milk coffee.", "coffee decoction, milk, sugar", "dairy"),

  // ---- Foo ----
  "California Roll": D(false, 0, "Sushi", "Sushi roll with crab stick, cucumber and avocado.", "sushi rice, nori, crab stick, cucumber, avocado", "shellfish, soy, sesame"),
  "Spicy Tuna Roll": D(false, 2, "Sushi", "Sushi roll with tuna and spicy mayo.", "sushi rice, nori, tuna, spicy mayo, cucumber", "fish, egg, soy, sesame"),
  "Salmon Nigiri": D(false, 0, "Sushi", "Slices of salmon over pressed sushi rice.", "sushi rice, salmon, wasabi", "fish, soy"),
  "Edamame": D(true, 0, "Starter", "Steamed young soybeans with sea salt.", "soybeans, sea salt", "soy"),
  "Miso Soup": D(false, 0, "Soup", "Japanese soup with miso, tofu and seaweed.", "miso paste, tofu, seaweed, spring onion, fish stock", "soy, fish"),

  // ---- Sesame ----
  "Avocado Roll": D(true, 0, "Sushi", "Vegetarian sushi roll with avocado and cucumber.", "sushi rice, nori, avocado, cucumber", "soy, sesame"),
  "Dragon Roll": D(false, 1, "Sushi", "Sushi roll topped with avocado, with eel-style filling.", "sushi rice, nori, prawn tempura, avocado, sauce", "shellfish, gluten, soy, sesame"),
  "Vegetable Gyoza": D(true, 0, "Starter", "Pan-fried dumplings filled with vegetables.", "dumpling wrapper, cabbage, carrot, ginger, soy sauce", "gluten, soy"),
  "Teriyaki Chicken": D(false, 0, "Main Course", "Grilled chicken glazed in teriyaki sauce.", "chicken, soy sauce, mirin, sugar, ginger", "soy, gluten"),
  "Jasmine Rice": D(true, 0, "Rice", "Steamed fragrant jasmine rice.", "jasmine rice", ""),

  // ---- Taco Bell ----
  "Crispy Chicken Taco": D(false, 1, "Tacos", "Crunchy taco shell with chicken, lettuce and sauce.", "taco shell, fried chicken, lettuce, sauce", "gluten, dairy"),
  "Veg Mexican Rice Bowl": D(true, 1, "Bowl", "Mexican rice with beans, veggies and salsa.", "rice, black beans, corn, tomato salsa, sour cream", "dairy"),
  "Nachos with Cheese": D(true, 1, "Snack", "Corn nachos with warm cheese sauce.", "corn chips, cheese sauce, jalapeno", "dairy"),
  "Quesadilla": D(true, 1, "Tacos", "Grilled tortilla filled with melted cheese and veggies.", "flour tortilla, cheese, onion, capsicum", "gluten, dairy"),
  "Iced Tea": D(true, 0, "Beverage", "Chilled lemon iced tea.", "tea, lemon, sugar, ice", ""),

  // ---- Madras Cafe ----
  "Plain Dosa": D(true, 0, "South Indian", "Thin crispy rice and lentil crepe with chutney.", "rice batter, urad dal, oil", ""),
  "Rava Idli": D(true, 0, "South Indian", "Steamed semolina idli with cashew and mustard.", "semolina, yogurt, cashew, mustard seeds", "gluten, dairy, nuts"),
  "Onion Uttapam": D(true, 1, "South Indian", "Thick dosa topped with onion and green chilli.", "rice batter, urad dal, onion, green chilli", ""),
  "Pongal": D(true, 1, "Breakfast", "Comforting rice and moong dal with pepper and ghee.", "rice, moong dal, black pepper, cumin, ghee, cashew", "dairy, nuts"),

  // ---- Delhi Darbar / Persian Darbar / Mini Punjab ----
  "Chicken Biryani": D(false, 2, "Biryani", "Fragrant basmati rice layered with spiced chicken.", "basmati rice, chicken, yogurt, onion, biryani spices, saffron", "dairy"),
  "Mutton Rogan Josh": D(false, 2, "Main Course", "Slow-cooked mutton in a Kashmiri-style red gravy.", "mutton, yogurt, Kashmiri chilli, fennel, ginger, spices", "dairy"),
  "Paneer Tikka": D(true, 2, "Starter", "Grilled marinated paneer cubes.", "paneer, yogurt, capsicum, onion, tandoori spices", "dairy"),
  "Phirni": D(true, 0, "Dessert", "Chilled ground-rice pudding with cardamom.", "rice, milk, sugar, cardamom, pistachio", "dairy, nuts"),
  "Mutton Seekh Kebab": D(false, 2, "Starter", "Minced mutton skewers grilled in a tandoor.", "minced mutton, onion, ginger, garlic, spices", ""),
  "Paneer Makhani": D(true, 1, "Main Course", "Paneer in a rich buttery tomato gravy.", "paneer, tomato, butter, cream, cashew", "dairy, nuts"),
  "Caramel Custard": D(true, 0, "Dessert", "Baked egg custard with caramel topping.", "milk, eggs, sugar, vanilla", "dairy, egg"),
  "Paneer Handi": D(true, 2, "Main Course", "Paneer cooked in a spiced onion-tomato gravy.", "paneer, onion, tomato, capsicum, spices", "dairy"),
  "Butter Chicken": D(false, 1, "Main Course", "Tandoori chicken in a creamy tomato gravy.", "chicken, tomato, butter, cream, cashew, spices", "dairy, nuts"),
  "Veg Pulao": D(true, 1, "Rice", "Fragrant rice cooked with mixed vegetables.", "basmati rice, carrot, peas, beans, whole spices", ""),
  "Naan": D(true, 0, "Bread", "Plain tandoor-baked naan.", "refined flour, yogurt", "gluten, dairy"),
  "Gulab Jamun": D(true, 0, "Dessert", "Milk-solid dumplings in sugar syrup.", "milk solids, flour, sugar, cardamom", "gluten, dairy"),

  // ---- Banana Leaf ----
  "Ghee Roast Dosa": D(true, 1, "South Indian", "Extra crispy dosa roasted in ghee.", "rice batter, urad dal, ghee", "dairy"),
  "Mini Idli with Sambar": D(true, 1, "South Indian", "Bite-sized idlis soaked in sambar.", "rice batter, urad dal, toor dal, vegetables", ""),
  "Rava Masala Dosa": D(true, 1, "South Indian", "Crispy semolina dosa with potato masala.", "semolina, rice flour, potato, onion, spices", "gluten"),

  // ---- Chili's ----
  "Loaded Nachos": D(false, 2, "Snack", "Nachos topped with cheese, beans, jalapeno and chicken.", "corn chips, cheese, beans, jalapeno, chicken, sour cream", "dairy"),
  "Classic Chicken Wings": D(false, 2, "Starter", "Crispy chicken wings tossed in buffalo sauce.", "chicken wings, buffalo sauce, butter", "dairy"),
  "Veg Quesadilla": D(true, 1, "Tacos", "Grilled tortilla with cheese and vegetables.", "flour tortilla, cheese, capsicum, corn, onion", "gluten, dairy"),
  "BBQ Ribs": D(false, 1, "Main Course", "Slow-cooked pork ribs glazed in BBQ sauce.", "pork ribs, BBQ sauce, spices", "soy"),
  "Chocolate Lava Cake": D(true, 0, "Dessert", "Warm chocolate cake with a molten centre.", "flour, chocolate, butter, eggs, sugar", "gluten, dairy, egg"),

  // ---- KFC ----
  "Zinger Burger": D(false, 2, "Burger", "Spicy crispy fried chicken burger.", "bun, fried chicken fillet, lettuce, mayo", "gluten, egg"),
  "Popcorn Chicken": D(false, 1, "Snack", "Bite-sized crispy fried chicken.", "chicken, flour coating, spices", "gluten"),
  "Chicken Bucket (4 pcs)": D(false, 1, "Main Course", "Four pieces of crispy fried chicken.", "chicken, flour coating, spices", "gluten"),
  "Pepsi Can": D(true, 0, "Beverage", "Chilled cola can.", "carbonated water, sugar, flavouring", ""),
};

export default dishDetails;
