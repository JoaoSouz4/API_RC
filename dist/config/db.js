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

// src/config/db.ts
var db_exports = {};
__export(db_exports, {
  default: () => startDB
});
module.exports = __toCommonJS(db_exports);
var import_mongoose = __toESM(require("mongoose"));

// src/config/default.ts
require("dotenv").config();
var default_default = {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS
};

// src/config/db.ts
async function startDB() {
  const url = `mongodb+srv://${default_default.dbUser}:${default_default.dbPass}@cluster0.gc4ly0f.mongodb.net/users_RC?retryWrites=true&w=majority`;
  try {
    await import_mongoose.default.connect(url);
    console.log("Connect at MongoDB");
  } catch (error) {
    console.log("Erro na conex\xE3o com o MongoDB");
  }
}
