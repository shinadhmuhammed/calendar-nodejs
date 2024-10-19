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
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../Models/userModel");
class AuthService {
    constructor() { }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield userModel_1.User.findOne({ email });
            if (userExists)
                throw new Error('User already exists');
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = new userModel_1.User({ name, email, password: hashedPassword });
            yield user.save();
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.User.findOne({ email });
            if (!user)
                throw new Error('Invalid credentials');
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error('Invalid credentials');
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return { user, token };
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel_1.User.findById(id);
        });
    }
}
exports.authService = new AuthService();
