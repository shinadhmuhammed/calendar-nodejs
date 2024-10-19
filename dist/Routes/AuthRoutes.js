"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/signup", authController_1.authController.register);
        this.router.post("/login", authController_1.authController.login);
        this.router.get("/manager", authController_1.authController.getManager);
        this.router.get("/employees", authMiddleware_1.authenticateToken, authController_1.authController.getEmployeesByManager);
    }
}
exports.authRoutes = new AuthRoutes().router;
