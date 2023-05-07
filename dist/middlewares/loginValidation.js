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

// src/middlewares/loginValidation.ts
var loginValidation_exports = {};
__export(loginValidation_exports, {
  loginValidation: () => loginValidation
});
module.exports = __toCommonJS(loginValidation_exports);

// src/models/userModel.ts
var import_mongoose = __toESM(require("mongoose"));
var import_mongoose2 = require("mongoose");
var userModel = new import_mongoose2.Schema({
  userName: String,
  userEmail: String,
  userPass: String
});
var User = import_mongoose.default.model("User", userModel);
var userModel_default = User;

// src/middlewares/loginValidation.ts
var bcrypt = require("bcrypt");
var loginValidation = async (req, res, next) => {
  const { userName, userPass } = req.body;
  const user = await userModel_default.findOne({ userName });
  if (!user)
    return res.status(401).json({
      message: `Usu\xE1rio ${userName} n\xE3o registrado no sistema`,
      isSucess: false
    });
  const checkPassword = await bcrypt.compare(userPass, user.userPass);
  if (!checkPassword)
    return res.status(401).json({
      message: "Senha incorreta",
      isSucess: false
    });
  next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loginValidation
});
