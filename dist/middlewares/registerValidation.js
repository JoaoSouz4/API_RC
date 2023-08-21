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

// src/middlewares/registerValidation.ts
var registerValidation_exports = {};
__export(registerValidation_exports, {
  registerValidation: () => registerValidation
});
module.exports = __toCommonJS(registerValidation_exports);

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

// src/middlewares/registerValidation.ts
var registerValidation = async (req, res, next) => {
  const { userName, userEmail, userPass, userConfirmPass } = req.body;
  const user = await userModel_default.findOne({ userEmail });
  const userN = await userModel_default.findOne({ userName });
  if (userN)
    return res.status(401).json({
      message: `${userName} n\xE3o est\xE1 dispon\xEDvel como nome de usu\xE1rio.`,
      isSucess: false
    });
  if (user)
    return res.status(401).json({
      message: `O ${userEmail} j\xE1 est\xE1 sendo usando por outro usu\xE1rio.`,
      isSucess: false
    });
  if (userPass != userConfirmPass)
    return res.status(401).json({
      message: "As senhas precisam ser iguais",
      isSucess: false
    });
  next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerValidation
});
