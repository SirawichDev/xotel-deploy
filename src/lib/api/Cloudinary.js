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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const process_1 = __importDefault(require("process"));
if (process_1.default.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("dotenv").config({ path: "dev.env" });
}
require("dotenv").config({ path: "prod.env" });
exports.Cloudinary = {
    upload: (image) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield cloudinary_1.default.v2.uploader.upload(image, {
            api_key: process_1.default.env.CLOUDINARY_KEY,
            api_secret: process_1.default.env.CLOUDINARY_SECRET,
            cloud_name: process_1.default.env.CLOUDINARY_NAME,
            folder: "Xotel_Asset/",
        });
        return res.secure_url;
    }),
};