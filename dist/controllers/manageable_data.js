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
exports.getAllmanageable_data = void 0;
const manageable_data_1 = require("../models/manageable_data");
const getAllmanageable_data = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allmanageable_data = yield manageable_data_1.manageable_data.findAll({ logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Listing des données administrables effectué avec sucess", data: allmanageable_data });
});
exports.getAllmanageable_data = getAllmanageable_data;
// fonction pour send requette + detail en console.log
function sendToLogToConsole(sql, queryObject) {
    // save the `sql` query in Elasticsearch
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
}
