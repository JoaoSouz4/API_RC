"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/checkAuth.ts
var checkAuth_exports = {};
__export(checkAuth_exports, {
  checkAuth: () => checkAuth
});
module.exports = __toCommonJS(checkAuth_exports);
var jwt = require("jsonwebtoken");
var checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null)
    return res.status(401).json({ message: "Acesso negado", status: false });
  try {
    const secret = process.env.secret;
    const authData = jwt.verify(token, secret);
    console.log(authData);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token Inv\xE1lido", status: false });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkAuth
});
