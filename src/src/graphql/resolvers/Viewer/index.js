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
exports.viewerResolver = void 0;
const crypto_1 = __importDefault(require("crypto"));
const api_1 = require("../../../lib/api");
const utils_1 = require("../../../lib/utils");
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
};
const logInviaGoogle = (code, token, db, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = yield api_1.Google.logIn(code);
    if (!user) {
        throw new Error("Google login error");
    }
    const usernameList = user.names && user.names.length ? user.names : null;
    const userPhotoList = user.photos && user.photos.length ? user.photos : null;
    const userEmailList = user.emailAddresses && user.emailAddresses.length
        ? user.emailAddresses
        : null;
    const userName = usernameList ? usernameList[0].displayName : null;
    const userId = usernameList && usernameList[0].metadata && usernameList[0].metadata.source
        ? usernameList[0].metadata.source.id
        : null;
    const userAvatar = userPhotoList && userPhotoList[0].url ? userPhotoList[0].url : null;
    const userEmail = userEmailList && userEmailList[0].value ? userEmailList[0].value : null;
    if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error("Google Login Error");
    }
    const updateRes = yield db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            token,
        },
    }, { returnOriginal: false });
    let viewer = updateRes.value;
    if (!viewer) {
        const insertResult = yield db.users.insertOne({
            _id: userId,
            token,
            avatar: userAvatar,
            name: userName,
            contact: userEmail,
            income: 0,
            bookings: [],
            listings: [],
        });
        viewer = insertResult.ops[0];
    }
    res.cookie("viewer", userId, Object.assign(Object.assign({}, cookieOptions), { maxAge: 365 * 24 * 60 * 60 * 1000 }));
    return viewer;
});
const logInViaCookie = (token, db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateRes = yield db.users.findOneAndUpdate({ _id: req.signedCookies.viewer }, { $set: { token } }, { returnOriginal: false });
    // eslint-disable-next-line prefer-const
    let viewer = updateRes.value;
    if (!viewer) {
        res.clearCookie("viewer", cookieOptions);
    }
    return viewer;
});
exports.viewerResolver = {
    Query: {
        authUrl: () => {
            try {
                return api_1.Google.authUrl;
            }
            catch (e) {
                throw Error(`Failed to query google auth url: ${e}`);
            }
        },
    },
    Mutation: {
        logIn: (_root, { input }, { db, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const code = input ? input.code : null;
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const viewer = code
                    ? yield logInviaGoogle(code, token, db, res)
                    : yield logInViaCookie(token, db, req, res);
                if (!viewer) {
                    return { _id: "", didRequest: true };
                }
                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true,
                };
            }
            catch (e) {
                throw new Error(`Failed to log in ${e}`);
            }
        }),
        logOut: (_root, _args, { res }) => {
            try {
                res.clearCookie("viewer", cookieOptions);
                return { didRequest: true };
            }
            catch (e) {
                throw new Error(`Failed to log out ${e}`);
            }
        },
        connectStripe: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { code } = input;
                let viewer = yield utils_1.authorize(db, req);
                if (!viewer) {
                    throw new Error("viewer can't be found");
                }
                const wallet = yield api_1.Stripe.connect(code);
                if (!wallet || !wallet.stripe_user_id) {
                    throw new Error("stripe grant error");
                }
                const updateRes = yield db.users.findOneAndUpdate({ _id: viewer._id }, { $set: { walletId: wallet.stripe_user_id } }, { returnOriginal: false });
                if (!updateRes) {
                    throw new Error("viewer could not be updated");
                }
                viewer = updateRes.value;
                return {
                    _id: viewer === null || viewer === void 0 ? void 0 : viewer._id,
                    token: viewer === null || viewer === void 0 ? void 0 : viewer.token,
                    avatar: viewer === null || viewer === void 0 ? void 0 : viewer.avatar,
                    walletId: viewer === null || viewer === void 0 ? void 0 : viewer.walletId,
                    didRequest: true,
                };
            }
            catch (err) {
                throw new Error(`Faileld to connect with Stripe ${err}`);
            }
        }),
        disconnectStripe: (_root, _args, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let viewer = yield utils_1.authorize(db, req);
                if (!viewer) {
                    throw new Error("viewer could not be found");
                }
                const updateRes = yield db.users.findOneAndUpdate({ _id: viewer._id }, { $set: { walletId: "" } }, { returnOriginal: false });
                if (!updateRes.value) {
                    throw new Error("viewer could not be updated");
                }
                viewer = updateRes.value;
                return {
                    _id: viewer === null || viewer === void 0 ? void 0 : viewer._id,
                    token: viewer === null || viewer === void 0 ? void 0 : viewer.token,
                    avatar: viewer === null || viewer === void 0 ? void 0 : viewer.avatar,
                    walletId: viewer === null || viewer === void 0 ? void 0 : viewer.walletId,
                    didRequest: true,
                };
            }
            catch (err) {
                throw new Error(`Failed to connect with Stripe ${err}`);
            }
        }),
    },
    Viewer: {
        id: (viewer) => {
            return viewer._id;
        },
        hasWallet: (viewer) => {
            return viewer.walletId ? true : undefined;
        },
    },
};
