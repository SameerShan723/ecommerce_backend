import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/category.model.js";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Store from "./models/store.model.js";
import bcrypt from "bcrypt";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URL || "mongodb://localhost:27017/ecommerceDB";

const seeder = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URI);

    console.log("Database connected!");

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Category.deleteMany({});
    // await Product.deleteMany({});
    // await Store.deleteMany({});
    // await User.deleteMany({ role: "admin" }); // Clear admin users to reassign stores
    // console.log("Cleared existing categories, products, stores, and admin users");

    // Create Stores
    const stores = [
      {
        name: "TechHub Store",
        description: "Premium electronics and tech gadgets",
        logo: "https://example.com/techhub-logo.jpg",
        address: {
          street: "123 Tech Street",
          city: "San Francisco",
          country: "USA",
        },
        contact: {
          email: "contact@techhub.com",
          phone: "+1-555-0101",
        },
      },
      {
        name: "Fashion Forward",
        description: "Trendy clothing and accessories",
        logo: "https://example.com/fashion-logo.jpg",
        address: {
          street: "456 Fashion Ave",
          city: "New York",
          country: "USA",
        },
        contact: {
          email: "hello@fashionforward.com",
          phone: "+1-555-0202",
        },
      },
      {
        name: "Home Essentials",
        description: "Everything you need for your home",
        logo: "https://example.com/home-logo.jpg",
        address: {
          street: "789 Home Lane",
          city: "Los Angeles",
          country: "USA",
        },
        contact: {
          email: "info@homeessentials.com",
          phone: "+1-555-0303",
        },
      },
      {
        name: "BookWorld",
        description: "Books for every reader",
        logo: "https://example.com/bookworld-logo.jpg",
        address: {
          street: "321 Library Road",
          city: "Boston",
          country: "USA",
        },
        contact: {
          email: "books@bookworld.com",
          phone: "+1-555-0404",
        },
      },
    ];

    // Create Admin Users first (one for each store)
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUsers = await User.insertMany([
      {
        name: "TechHub Admin",
        email: "admin@techhub.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Fashion Admin",
        email: "admin@fashionforward.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Home Admin",
        email: "admin@homeessentials.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "BookWorld Admin",
        email: "admin@bookworld.com",
        password: hashedPassword,
        role: "admin",
      },
    ]);
    console.log(`✅ Created ${adminUsers.length} admin users`);

    // Create stores with admin assigned
    const storesWithAdmin = stores.map((store, index) => ({
      ...store,
      admin: adminUsers[index]._id,
    }));
    const createdStores = await Store.insertMany(storesWithAdmin);
    console.log(`✅ Created ${createdStores.length} stores with admins assigned`);

    // Use first admin for seeding products (will be distributed across stores)
    const adminUser = adminUsers[0];

    // Seed Categories
    const categories = [
      {
        category_name: "Electronics",
        description:
          "Electronic gadgets and devices including smartphones, laptops, tablets, and accessories",
      },
      {
        category_name: "Books",
        description:
          "Various kinds of books including fiction, non-fiction, educational, and reference books",
      },
      {
        category_name: "Clothing",
        description:
          "Apparel and garments for men, women, and children including casual and formal wear",
      },
      {
        category_name: "Home Appliances",
        description:
          "Appliances for home use including kitchen, laundry, and cleaning appliances",
      },
      {
        category_name: "Sports & Outdoors",
        description:
          "Sports equipment, outdoor gear, fitness accessories, and athletic wear",
      },
      {
        category_name: "Beauty & Personal Care",
        description:
          "Cosmetics, skincare products, personal hygiene items, and beauty accessories",
      },
      {
        category_name: "Toys & Games",
        description:
          "Toys for children, board games, puzzles, video games, and collectibles",
      },
      {
        category_name: "Automotive",
        description:
          "Car accessories, parts, tools, and automotive maintenance products",
      },
      {
        category_name: "Furniture",
        description:
          "Home and office furniture including sofas, tables, chairs, and storage solutions",
      },
      {
        category_name: "Health & Wellness",
        description:
          "Health supplements, vitamins, fitness equipment, and wellness products",
      },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Seed Products - Distributed across stores
    // Electronics → TechHub Store, Books → BookWorld, Clothing → Fashion Forward, Home → Home Essentials
    const products = [
      // Electronics - TechHub Store
      {
        name: "iPhone 15 Pro",
        description:
          "Latest iPhone with A17 Pro chip, 48MP camera, and titanium design",
        price: 999.99,
        images: [
          "https://example.com/iphone15pro1.jpg",
          "https://example.com/iphone15pro2.jpg",
        ],
        category: createdCategories[0]._id, // Electronics
        brand: "Apple",
        stock: 50,
        rating: 4.8,
        reviews: [],
        createdBy: adminUsers[0]._id, // TechHub Admin
        store: createdStores[0]._id, // TechHub Store
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description:
          "Premium Android smartphone with S Pen, 200MP camera, and Snapdragon 8 Gen 3",
        price: 1199.99,
        images: ["https://example.com/galaxy1.jpg"],
        category: createdCategories[0]._id,
        brand: "Samsung",
        stock: 30,
        rating: 4.7,
        reviews: [],
        createdBy: adminUsers[0]._id, // TechHub Admin
        store: createdStores[0]._id, // TechHub Store
      },
      {
        name: "MacBook Pro 16-inch",
        description: "Powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD",
        price: 2499.99,
        images: ["https://example.com/macbook1.jpg"],
        category: createdCategories[0]._id,
        brand: "Apple",
        stock: 20,
        rating: 4.9,
        reviews: [],
        createdBy: adminUsers[0]._id, // TechHub Admin
        store: createdStores[0]._id, // TechHub Store
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        description:
          "Premium noise-cancelling wireless headphones with 30-hour battery",
        price: 399.99,
        images: ["https://example.com/sony1.jpg"],
        category: createdCategories[0]._id,
        brand: "Sony",
        stock: 75,
        rating: 4.6,
        reviews: [],
        createdBy: adminUsers[0]._id, // TechHub Admin
        store: createdStores[0]._id, // TechHub Store
      },
      // Books - BookWorld Store
      {
        name: "The Great Gatsby",
        description: "Classic American novel by F. Scott Fitzgerald",
        price: 12.99,
        images: ["https://example.com/gatsby1.jpg"],
        category: createdCategories[1]._id, // Books
        brand: "Scribner",
        stock: 100,
        rating: 4.5,
        reviews: [],
        createdBy: adminUsers[3]._id, // BookWorld Admin
        store: createdStores[3]._id, // BookWorld Store
      },
      {
        name: "Clean Code: A Handbook of Agile Software Craftsmanship",
        description: "Essential guide for writing clean, maintainable code",
        price: 47.99,
        images: ["https://example.com/cleancode1.jpg"],
        category: createdCategories[1]._id,
        brand: "Prentice Hall",
        stock: 45,
        rating: 4.8,
        reviews: [],
        createdBy: adminUsers[3]._id, // BookWorld Admin
        store: createdStores[3]._id, // BookWorld Store
      },
      // Clothing - Fashion Forward Store
      {
        name: "Classic White T-Shirt",
        description:
          "100% cotton comfortable t-shirt, perfect for everyday wear",
        price: 19.99,
        images: ["https://example.com/tshirt1.jpg"],
        category: createdCategories[2]._id, // Clothing
        brand: "Basic Wear",
        stock: 200,
        rating: 4.3,
        reviews: [],
        createdBy: adminUsers[1]._id, // Fashion Admin
        store: createdStores[1]._id, // Fashion Forward Store
      },
      {
        name: "Denim Jeans - Slim Fit",
        description: "Premium denim jeans with stretch fabric for comfort",
        price: 79.99,
        images: ["https://example.com/jeans1.jpg"],
        category: createdCategories[2]._id,
        brand: "Denim Co",
        stock: 150,
        rating: 4.4,
        reviews: [],
        createdBy: adminUsers[1]._id, // Fashion Admin
        store: createdStores[1]._id, // Fashion Forward Store
      },
      // Home Appliances - Home Essentials Store
      {
        name: "Dyson V15 Detect Vacuum",
        description:
          "Cordless vacuum with laser technology and HEPA filtration",
        price: 749.99,
        images: ["https://example.com/dyson1.jpg"],
        category: createdCategories[3]._id, // Home Appliances
        brand: "Dyson",
        stock: 25,
        rating: 4.7,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      {
        name: "Instant Pot Duo 7-in-1",
        description:
          "Pressure cooker, slow cooker, rice cooker, and more in one",
        price: 99.99,
        images: ["https://example.com/instantpot1.jpg"],
        category: createdCategories[3]._id,
        brand: "Instant Pot",
        stock: 60,
        rating: 4.6,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      // Sports & Outdoors - Fashion Forward Store
      {
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with Air Max cushioning",
        price: 150.0,
        images: ["https://example.com/nike1.jpg"],
        category: createdCategories[4]._id, // Sports & Outdoors
        brand: "Nike",
        stock: 80,
        rating: 4.5,
        reviews: [],
        createdBy: adminUsers[1]._id, // Fashion Admin
        store: createdStores[1]._id, // Fashion Forward Store
      },
      {
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat with carrying strap, 6mm thickness",
        price: 39.99,
        images: ["https://example.com/yogamat1.jpg"],
        category: createdCategories[4]._id,
        brand: "FitLife",
        stock: 120,
        rating: 4.4,
        reviews: [],
        createdBy: adminUsers[1]._id, // Fashion Admin
        store: createdStores[1]._id, // Fashion Forward Store
      },
      // Beauty & Personal Care - Fashion Forward Store
      {
        name: "L'Oreal Revitalift Anti-Aging Cream",
        description: "Daily moisturizer with SPF 30 and anti-aging properties",
        price: 24.99,
        images: ["https://example.com/loreal1.jpg"],
        category: createdCategories[5]._id, // Beauty & Personal Care
        brand: "L'Oreal",
        stock: 90,
        rating: 4.3,
        reviews: [],
        createdBy: adminUsers[1]._id, // Fashion Admin
        store: createdStores[1]._id, // Fashion Forward Store
      },
      {
        name: "Electric Toothbrush Pro",
        description: "Rechargeable electric toothbrush with 5 cleaning modes",
        price: 79.99,
        images: ["https://example.com/toothbrush1.jpg"],
        category: createdCategories[5]._id,
        brand: "OralCare",
        stock: 70,
        rating: 4.6,
        reviews: [],
        createdBy: adminUsers[1]._id, // Fashion Admin
        store: createdStores[1]._id, // Fashion Forward Store
      },
      // Toys & Games - Home Essentials Store
      {
        name: "LEGO Star Wars Millennium Falcon",
        description:
          "Detailed LEGO set with 1,329 pieces, perfect for collectors",
        price: 169.99,
        images: ["https://example.com/lego1.jpg"],
        category: createdCategories[6]._id, // Toys & Games
        brand: "LEGO",
        stock: 40,
        rating: 4.9,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      {
        name: "Chess Set Premium",
        description: "Handcrafted wooden chess set with board and pieces",
        price: 89.99,
        images: ["https://example.com/chess1.jpg"],
        category: createdCategories[6]._id,
        brand: "GameMaster",
        stock: 35,
        rating: 4.7,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      // Automotive - TechHub Store
      {
        name: "Car Phone Mount",
        description: "Magnetic car phone mount with 360° rotation",
        price: 24.99,
        images: ["https://example.com/mount1.jpg"],
        category: createdCategories[7]._id, // Automotive
        brand: "AutoGear",
        stock: 100,
        rating: 4.4,
        reviews: [],
        createdBy: adminUsers[0]._id, // TechHub Admin
        store: createdStores[0]._id, // TechHub Store
      },
      {
        name: "Car Floor Mats Set",
        description: "All-weather car floor mats, custom fit for most vehicles",
        price: 69.99,
        images: ["https://example.com/mats1.jpg"],
        category: createdCategories[7]._id,
        brand: "AutoGear",
        stock: 55,
        rating: 4.5,
        reviews: [],
        createdBy: adminUsers[0]._id, // TechHub Admin
        store: createdStores[0]._id, // TechHub Store
      },
      // Furniture - Home Essentials Store
      {
        name: "Ergonomic Office Chair",
        description:
          "Comfortable office chair with lumbar support and adjustable height",
        price: 299.99,
        images: ["https://example.com/chair1.jpg"],
        category: createdCategories[8]._id, // Furniture
        brand: "ComfortSeat",
        stock: 30,
        rating: 4.6,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      {
        name: "Modern Coffee Table",
        description: "Glass top coffee table with metal frame, modern design",
        price: 199.99,
        images: ["https://example.com/table1.jpg"],
        category: createdCategories[8]._id,
        brand: "HomeStyle",
        stock: 20,
        rating: 4.5,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      // Health & Wellness - Home Essentials Store
      {
        name: "Multivitamin Supplement",
        description:
          "Daily multivitamin with 20+ essential vitamins and minerals",
        price: 29.99,
        images: ["https://example.com/vitamin1.jpg"],
        category: createdCategories[9]._id, // Health & Wellness
        brand: "HealthPlus",
        stock: 150,
        rating: 4.4,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
      {
        name: "Resistance Bands Set",
        description:
          "Set of 5 resistance bands with different resistance levels",
        price: 19.99,
        images: ["https://example.com/bands1.jpg"],
        category: createdCategories[9]._id,
        brand: "FitLife",
        stock: 110,
        rating: 4.5,
        reviews: [],
        createdBy: adminUsers[2]._id, // Home Admin
        store: createdStores[2]._id, // Home Essentials Store
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log("\n🎉 Seeding completed successfully!");
    console.log(`   - Stores: ${createdStores.length}`);
    console.log(`   - Admin Users: ${adminUsers.length}`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log("\n📦 Store Details:");
    createdStores.forEach((store, index) => {
      console.log(
        `   ${index + 1}. ${store.name} - Admin: ${adminUsers[index].email}`
      );
    });

    await mongoose.disconnect();
    console.log("\nDisconnected from database.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seeder();
