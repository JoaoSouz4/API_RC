"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/drawController.ts
var drawController_exports = {};
__export(drawController_exports, {
  default: () => drawController_default
});
module.exports = __toCommonJS(drawController_exports);

// src/models/drawModel.ts
var import_mongoose = __toESM(require("mongoose"));
var import_mongoose2 = require("mongoose");
var drawModel = new import_mongoose2.Schema({
  title: String,
  font: String,
  data: String,
  section: String,
  description: String,
  categories: Array,
  url: Array,
  usersLiked: Array,
  usersComments: Array
});
var Draw = import_mongoose.default.model("draws", drawModel);
var drawModel_default = Draw;

// src/controllers/drawController.ts
var DrawController = class {
  static async getAllDraws(req, res) {
    try {
      const draws = await drawModel_default.find({});
      return res.status(200).json({ draws });
    } catch (error) {
      console.log(error);
    }
  }
  static async store(req, res) {
    const { title, font, data, description, categories, url } = req.body;
    const draw = new drawModel_default({
      title,
      font,
      data,
      description,
      categories,
      url
    });
    try {
      await draw.save();
      return res.status(200).json({
        message: "Desenho salvo",
        isSucess: true
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async getSomeDraw(req, res) {
    const section = req.params.section;
    const draw = await drawModel_default.find({ section });
    if (!draw)
      return res.status(400).json({ message: "Tipo de desenho n\xE3o encontrado" });
    return res.status(200).json({ isSucess: true, draw });
  }
};
var drawController_default = DrawController;
