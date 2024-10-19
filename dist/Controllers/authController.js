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
exports.authController = void 0;
const auth_services_1 = require("../Services/auth.services");
const userModel_1 = require("../Models/userModel");
class AuthController {
    // Register User
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role, managerId } = req.body;
                const user = yield auth_services_1.authService.register(name, email, password, role, managerId);
                res.status(201).json({ message: 'User registered successfully', user });
            }
            catch (err) {
                console.error(err.message);
                res.status(400).json({ message: err.message });
            }
        });
    }
    // Login User
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { user, token } = yield auth_services_1.authService.login(email, password);
                res.status(200).json({ message: 'Login successful', user, token });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    getManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const managers = yield userModel_1.User.find({ role: 'Manager' });
                res.status(200).json(managers);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getEmployeesByManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const managerId = req.userId;
                console.log(managerId, 'manager');
                if (!managerId) {
                    return res.status(400).json({ message: 'Manager ID not found' });
                }
                const employees = yield auth_services_1.authService.getEmployees(managerId);
                res.status(200).json(employees);
            }
            catch (error) {
            }
        });
    }
}
exports.authController = new AuthController();
