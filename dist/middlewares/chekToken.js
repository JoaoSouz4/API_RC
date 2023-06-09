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

// src/middlewares/chekToken.ts
var chekToken_exports = {};
__export(chekToken_exports, {
  checkToken: () => checkToken
});
module.exports = __toCommonJS(chekToken_exports);
var jwt = require("jsonwebtoken");
var checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null)
    return res.status(401).json({ message: "Acesso negado", status: false });
  try {
    const secret = process.env.secret;
    const authData = jwt.verify(token, secret);
    return res.status(200).json({ authData });
  } catch (error) {
    return res.status(400).json({ message: "Token Inv\xE1lido", status: false });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkToken
});
