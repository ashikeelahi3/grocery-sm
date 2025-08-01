"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var uri, client, db, collection, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = process.env.MONGODB_URI;
                    client = new mongodb_1.MongoClient(uri);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 7]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    db = client.db("grocery-mvp");
                    collection = db.collection("products");
                    products = [
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
                    return [4 /*yield*/, collection.insertMany(products)];
                case 3:
                    _a.sent();
                    console.log("Seed data inserted successfully");
                    return [3 /*break*/, 7];
                case 4:
                    error_1 = _a.sent();
                    console.error("Seed error:", error_1);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, client.close()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
seed();
