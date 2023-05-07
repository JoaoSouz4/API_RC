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

// src/controllers/userController.ts
var userController_exports = {};
__export(userController_exports, {
  default: () => userController_default
});
module.exports = __toCommonJS(userController_exports);

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

// src/models/userModel.ts
var import_mongoose3 = __toESM(require("mongoose"));
var import_mongoose4 = require("mongoose");
var userModel = new import_mongoose4.Schema({
  userName: String,
  userEmail: String,
  userPass: String
});
var User = import_mongoose3.default.model("User", userModel);
var userModel_default = User;

// src/models/commentaryModel.ts
var import_mongoose5 = __toESM(require("mongoose"));
var import_mongoose6 = require("mongoose");
var CommentaryModel = new import_mongoose6.Schema({
  commentary: String,
  userName: String,
  idUser: String,
  idPost: String
});
var Commentary = import_mongoose5.default.model("comment", CommentaryModel);
var commentaryModel_default = Commentary;

// src/controllers/userController.ts
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var UserController = class {
  static async userRegister(req, res) {
    const { userName, userEmail, userPass } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(userPass, salt);
    const user = new userModel_default({
      userName,
      userEmail,
      userPass: passHash
    });
    try {
      await user.save();
      return res.status(200).json({
        message: "Cadastro realizdo com sucesso",
        isSucess: true
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  static async userLogin(req, res) {
    const { userName } = req.body;
    const user = await userModel_default.findOne({ userName });
    try {
      const secret = process.env.SECRET;
      const token = jwt.sign({ id: user._id, userName }, secret);
      return res.status(200).json({
        message: "login realizado com sucesso",
        isSucess: true,
        token
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async userLikePost(req, res) {
    const userId = req.params.iduser;
    const postId = req.params.idpost;
    try {
      const user = await userModel_default.findById({ _id: userId });
      const post = await drawModel_default.findById({ _id: postId });
      const userInPost = await drawModel_default.findOne({ _idUser: userId });
      if (userInPost) {
        return res.status(200).json({
          message: "O usu\xE1rio j\xE1 curtiu uma vez",
          isSucess: true
        });
      }
      post?.usersLiked.push({ _idUser: userId, userName: user?.userName });
      post?.save();
      return res.status(200).json({
        message: "Curtida inserida com sucesso",
        isSucess: true,
        currentQtdLikes: post?.usersLiked.length
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "n\xE3o foi poss\xEDvel curtir este post" });
    }
  }
  static async userDeslikePost(req, res) {
    const userId = req.params.iduser;
    const postId = req.params.idpost;
    try {
      const user = await userModel_default.findById({ _id: userId });
      const post = await drawModel_default.findById({ _id: postId });
      const resp = await drawModel_default.findOneAndUpdate({ title: post?.title }, { $pull: { usersLiked: { _idUser: userId } } });
      const newFind = await drawModel_default.findOne({ title: post?.title });
      return res.status(200).json({
        message: "Curtida tirada do registro",
        isSucess: true,
        currentQtdLikes: newFind?.usersLiked.length,
        resp
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "n\xE3o foi poss\xEDvel descurtir este post" });
    }
  }
  static async userComment(req, res) {
    const userId = req.params.userid;
    const postId = req.params.postid;
    const commentary = req.params.commentary;
    const user = await userModel_default.findById({ _id: userId });
    const post = await drawModel_default.findById({ _id: postId });
    try {
      post?.usersComments.push(await commentaryModel_default.create({
        idUser: userId,
        idPost: postId,
        userName: user?.userName,
        commentary
      }));
      post?.save();
      return res.status(200).json({
        message: "Coment\xE1rio registrado com sucesso",
        isSucess: true,
        currentComments: post?.usersComments
      });
    } catch (error) {
      return res.status(401).json({ message: "N\xE3o foi poss\xEDvel registrar o coment\xE1rio", isSucess: false });
    }
  }
  static async getComments(req, res) {
    const postId = req.params.id;
    const post = await drawModel_default.findById({ _id: postId });
    console.log(post?.usersComments);
    return res.status(200).json({
      isSucess: true,
      currentComments: post?.usersComments
    });
  }
  static async dropComment(req, res) {
    const postId = req.params.idpost;
    const commentId = req.params.idcomment;
    const post = await drawModel_default.findById({ _id: postId });
    for (let i in post.usersComments) {
      if (post.usersComments[i]._id == commentId) {
        post.usersComments.splice(i, 1);
      }
    }
    await post.save();
    return res.status(200).json({
      isSucess: true,
      currentComments: post.usersComments
    });
  }
};
var userController_default = UserController;
