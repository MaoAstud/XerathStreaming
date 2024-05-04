"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("./authController");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const authController = new authController_1.AuthController();
        router.post('/crear/usuario', authController.createUsuario);
        router.post('/iniciar/sesion', authController.createUsuario);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
