import { MongoClient } from "mongodb";

async function seed() {
  const uri = "mongodb+srv://ashikeelahi330:7DBgg2uvIAcOrhmN@cluster0.2s4zkrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("grocery-mvp");
    const collection = db.collection("products");


    const products = [
      {
        name: "Potato",
        price: 30,
        quantity: 50,
        category: "Vegetables",
        description: "Fresh potatoes from farm",
        image: "/images/potato.jpg",
        createdAt: new Date(),
      },
      {
        name: "Rice",
        price: 60,
        quantity: 100,
        category: "Grains",
        description: "Quality Basmati rice 1kg",
        image: "/images/rice.jpg",
        createdAt: new Date(),
      },
      {
        name: "Mustard Oil",
        price: 150,
        quantity: 25,
        category: "Cooking Oils",
        description: "Pure mustard oil 1L",
        image: "/images/mustard-oil.jpg",
        createdAt: new Date(),
      },
      {
        name: "Salt",
        price: 20,
        quantity: 200,
        category: "Essentials",
        description: "Iodized salt 1kg",
        image: "/images/salt.jpg",
        createdAt: new Date(),
      },
      {
        name: "Onions",
        price: 45,
        quantity: 75,
        category: "Vegetables",
        description: "Fresh red onions, great for cooking",
        image: "/images/onions.jpg",
        createdAt: new Date(),
      },
      {
        name: "Wheat Flour",
        price: 80,
        quantity: 60,
        category: "Grains",
        description: "Stone-ground whole wheat flour 5kg",
        image: "/images/wheat-flour.jpg",
        createdAt: new Date(),
      },
      {
        name: "Sunflower Oil",
        price: 180,
        quantity: 35,
        category: "Cooking Oils",
        description: "Refined sunflower oil 1L, light and healthy",
        image: "/images/sunflower-oil.jpg",
        createdAt: new Date(),
      },
      {
        name: "Sugar",
        price: 40,
        quantity: 150,
        category: "Essentials",
        description: "White crystal sugar 1kg",
        image: "/images/sugar.jpg",
        createdAt: new Date(),
      },
      {
        name: "Tomatoes",
        price: 55,
        quantity: 90,
        category: "Vegetables",
        description: "Ripe, juicy tomatoes perfect for salads and sauces",
        image: "/images/tomatoes.jpg",
        createdAt: new Date(),
      },
      {
        name: "Lentils",
        price: 95,
        quantity: 80,
        category: "Grains",
        description: "High-protein red lentils 1kg",
        image: "/images/lentils.jpg",
        createdAt: new Date(),
      },
    ];


    await collection.insertMany(products);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await client.close();
  }
}

seed();
