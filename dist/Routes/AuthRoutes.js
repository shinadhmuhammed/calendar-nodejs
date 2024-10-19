"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/signup", authController_1.authController.register);
        this.router.post("/login", authController_1.authController.login);
    }
}
exports.authRoutes = new AuthRoutes().router;
