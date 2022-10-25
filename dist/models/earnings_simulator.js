"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.earnings_simulator = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let earnings_simulator = class earnings_simulator extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.REAL,
        allowNull: false,
    })
], earnings_simulator.prototype, "CA", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.REAL,
        allowNull: false,
    })
], earnings_simulator.prototype, "marge", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.REAL,
        allowNull: false,
    })
], earnings_simulator.prototype, "CA_avec_WellEat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.REAL,
        allowNull: false,
    })
], earnings_simulator.prototype, "marge_avec_WellEat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.REAL,
        allowNull: false,
    })
], earnings_simulator.prototype, "benefice_avec_WellEat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], earnings_simulator.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], earnings_simulator.prototype, "updatedAt", void 0);
earnings_simulator = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "earnings_simulator",
    })
], earnings_simulator);
exports.earnings_simulator = earnings_simulator;
