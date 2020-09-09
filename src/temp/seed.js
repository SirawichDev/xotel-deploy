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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = require("../database");
const types_1 = require("../lib/types");
// console.log("Random ObjectID: ", new ObjectId());
const listings = [
    {
        _id: new mongodb_1.ObjectId("5f095151eb0fb739e5e06541"),
        title: "Modern Spacious 1 Bedroom Loft",
        description: "Prime location, amazing lighting and no annoying neighbours.  Good place to rent if you want a relaxing time in Montreal. Lot's of plants and lights.  Really great modern bathroom that you will love showering in :) and a kitchen equipped with everything you need to cook a great meal.  (we live here)",
        address: "Barcelona, Catalunya",
        image: "https://a0.muscache.com/im/pictures/9fa69ad8-c9be-45dd-966b-b8f59bdccb2b.jpg?aki_policy=large",
        host: "5f04c78c67b0de2bdd20t",
        country: "Spain",
        city: "thailand",
        type: types_1.ListingType.Apartment,
        admin: "Wanwimon",
        bookings: [],
        authorized: true,
        bookingsIndex: {},
        price: 5532,
        numOfGuests: 6,
    },
    {
        _id: new mongodb_1.ObjectId("5f09515b5259403a59d1c5af"),
        title: "Ótimo Apto proximo Parque Olimpico",
        description: "Apartamento próximo ao centro dos Jogos Olímpicos 2016 a 6 Km do Parque Olímpico e próximo a praia. Infraestrutura total de transporte além de shoppings e comércio. Área nobre do Rio de Janeiro.",
        address: "Rio de Janeiro, Rio de Janeiro, Brazil, Recreio dos Bandeirantes",
        image: "https://a0.muscache.com/im/pictures/5b1f4beb-6e06-41f0-970b-044f2f28d957.jpg?aki_policy=large",
        host: "5f04c78c67b0de2bdd20q",
        country: "thailand",
        city: "songkhla",
        type: types_1.ListingType.House,
        admin: "SirawichExE",
        authorized: true,
        bookings: [],
        bookingsIndex: {},
        price: 9000,
        numOfGuests: 1,
    },
    {
        _id: new mongodb_1.ObjectId("5f095169874ad03acd181d71"),
        title: "Surry Hills Studio - Your Perfect Base in Sydney",
        description: "This spacious, light filled studio has everything you need to enjoy Sydney and is the perfect base for exploring. The harbour is an easy walk, Bondi a short bus trip away.",
        address: "Surry Hills, NSW",
        image: "https://a0.muscache.com/im/pictures/f8eaba4e-d211-42fb-a3ca-887c0ff766f8.jpg?aki_policy=large",
        host: "5f04c78c67b0de2bdd20q",
        country: "thailand",
        city: "phuket",
        authorized: true,
        type: types_1.ListingType.House,
        admin: "SirawichExE",
        bookings: [],
        bookingsIndex: {},
        price: 3211,
        numOfGuests: 6,
    },
    {
        _id: new mongodb_1.ObjectId("5f0951715b720e3b40933ced"),
        title: "Apartamento zona sul do RJ",
        description: "próximo aos principais pontos turísticos,,do lado do metro, vista p o CRISTO REDENTOR, GARAGEM, FAXINEIRA, PLAY..",
        address: "Rio de Janeiro, Rio de Janeiro",
        image: "https://a0.muscache.com/im/pictures/96bb9ea5-a164-4fb6-a136-a21b168a72d7.jpg?aki_policy=large",
        host: "5f04c78c67b0de2bdd20t",
        authorized: true,
        country: "thailand",
        city: "songkhla",
        type: types_1.ListingType.Apartment,
        admin: "Wanwimon",
        bookings: [],
        bookingsIndex: {},
        price: 2222,
        numOfGuests: 3,
    },
    {
        _id: new mongodb_1.ObjectId("5f0958cf2d9e9c427905054c"),
        title: "SN. Apartament",
        description: "อพาท์เม้น หรูสวย เหมาะกับการ พักผ่อน",
        address: "30/145-158 ต.กะทู้ อ.กะทู้ ",
        image: "https://a0.muscache.com/im/pictures/96bb9ea5-a164-4fb6-a136-a21b168a72d7.jpg?aki_policy=large",
        host: "5f09517f038b3e3bbcd4de7e",
        country: "thailand",
        city: "phuket",
        authorized: true,
        type: types_1.ListingType.Apartment,
        admin: "SirawichExE",
        bookings: [],
        bookingsIndex: {},
        price: 5000,
        numOfGuests: 2,
    },
];
const users = [
    {
        _id: "5f09517f038b3e3bbcd4de7e",
        token: "token_*********",
        name: "SirawichExE",
        avatar: "https://avatars2.githubusercontent.com/u/15623532?s=60&v=4",
        contact: "sirawit0676@gmail.com",
        income: 20000,
        walletId: "acct_********",
        bookings: [],
        listings: [
            new mongodb_1.ObjectId("5f09515b5259403a59d1c5af"),
            new mongodb_1.ObjectId("5f095169874ad03acd181d71"),
            new mongodb_1.ObjectId("5f095169874ad03acd181d71"),
            new mongodb_1.ObjectId("5f0958cf2d9e9c427905054c"),
            new mongodb_1.ObjectId("5f0951715b720e3b40933ced")
        ],
    },
    {
        _id: "5f095189dc8d963c2ec2c565",
        token: "token_*********",
        name: "Wanwimon",
        avatar: "https://i.ytimg.com/vi/aEvItEpMly8/maxresdefault.jpg",
        contact: "sirawit0676@gmail.com",
        income: 32050,
        walletId: "acct_********",
        bookings: [],
        listings: [
            new mongodb_1.ObjectId("5f0951715b720e3b40933ced"),
            new mongodb_1.ObjectId("5f095151eb0fb739e5e06541"),
        ],
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[seed] : running...");
        const db = yield database_1.connectDatabase();
        for (const listing of listings) {
            yield db.listings.insertOne(listing);
        }
        for (const user of users) {
            yield db.users.insertOne(user);
        }
        console.log("[seed] : success");
    }
    catch (_a) {
        throw new Error("Failed to seed database");
    }
});
seed();
