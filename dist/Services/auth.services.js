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
    // Register new user
    register(name, email, password, role, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield userModel_1.User.findOne({ email });
                if (userExists)
                    throw new Error('User already exists');
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const user = new userModel_1.User({
                    username: name,
                    email,
                    password: hashedPassword,
                    role,
                    managerId: managerId ? managerId : undefined,
                });
                yield user.save();
                return user;
            }
            catch (error) {
                console.error('Error during registration:', error.message);
                throw new Error(error.message || 'Error registering user');
            }
        });
    }
    // Login user
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
            }
            catch (error) {
                console.error('Error during login:', error.message);
                throw new Error(error.message || 'Login failed');
            }
        });
    }
    // Get user by ID
    // public async getUserById(id: string): Promise<IUser | null> {
    //   try {
    //     const user = await User.findById(id);
    //     if (!user) throw new Error('User not found');
    //     return user;
    //   } catch (error: any) {
    //     console.error('Error fetching user by ID:', error.message);
    //     throw new Error(error.message || 'Error fetching user');
    //   }
    // }
    // Get employees assigned to a manager
    getEmployees(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield userModel_1.User.find({ role: 'Employee', managerId });
                console.log(employees, 'employees');
                return employees;
            }
            catch (error) {
                console.error('Error fetching employees:', error.message);
                throw new Error(error.message || 'Error fetching employees');
            }
        });
    }
}
exports.authService = new AuthService();
