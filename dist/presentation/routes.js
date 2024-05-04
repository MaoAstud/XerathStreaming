"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const authRoutes_1 = require("../auth/authRoutes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/streaming/auth', authRoutes_1.AuthRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
