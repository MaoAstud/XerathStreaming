"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRoutes = void 0;
const express_1 = require("express");
const crudController_1 = require("./crudController");
class CrudRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const crudController = new crudController_1.CrudController();
        router.get('/', crudController.getCrud);
        router.post('/crear/usuario', crudController.createUsuario);
        return router;
    }
}
exports.CrudRoutes = CrudRoutes;
