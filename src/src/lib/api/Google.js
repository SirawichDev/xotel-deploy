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
exports.Google = void 0;
if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("dotenv").config({ path: "dev.env" });
}
require("dotenv").config({ path: "prod.env" });
const googleapis_1 = require("googleapis");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const maps = new google_maps_services_js_1.Client({});
const parseAddress = (addressComponents) => {
    let country = null;
    let admin = null;
    let city = null;
    for (const component of addressComponents) {
        if (component.types.includes(google_maps_services_js_1.AddressType.country)) {
            country = component.long_name;
        }
        if (component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_1) ||
            component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_2)) {
            admin = component.long_name;
        }
        if (component.types.includes(google_maps_services_js_1.AddressType.locality) ||
            component.types.includes(google_maps_services_js_1.AddressType.sublocality_level_1) ||
            component.types.includes(google_maps_services_js_1.GeocodingAddressComponentType.postal_town)) {
            city = component.long_name;
        }
    }
    return { country, admin, city };
};
const auth = new googleapis_1.google.auth.OAuth2(process.env.G_CLINET_ID, process.env.G_CLIENT_SEC, `${process.env.PUBLIC_URL}/login`);
exports.Google = {
    authUrl: auth.generateAuthUrl({
        access_type: "online",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
    }),
    logIn: (code) => __awaiter(void 0, void 0, void 0, function* () {
        const { tokens } = yield auth.getToken(code);
        auth.setCredentials(tokens);
        const { data } = yield googleapis_1.google.people({ version: "v1", auth }).people.get({
            resourceName: "people/me",
            personFields: "emailAddresses,names,photos",
        });
        return { user: data };
    }),
    geocode: (address) => __awaiter(void 0, void 0, void 0, function* () {
        if (!process.env.G_GEO_KEY)
            throw new Error("missing Google Maps API key");
        const res = yield maps.geocode({
            params: { address, key: process.env.G_GEO_KEY },
        });
        if (res.status < 200 || res.status > 299) {
            throw new Error("failed to geocode address");
        }
        return parseAddress(res.data.results[0].address_components);
    }),
};