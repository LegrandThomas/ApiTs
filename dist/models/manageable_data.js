"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageable_data = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let manageable_data = class manageable_data extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], manageable_data.prototype, "nom_manageable_data", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.REAL,
        allowNull: false,
    })
], manageable_data.prototype, "valeur_manageable_data", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], manageable_data.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], manageable_data.prototype, "updatedAt", void 0);
manageable_data = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "manageable_data",
    })
], manageable_data);
exports.manageable_data = manageable_data;
