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

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

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

// src/middlewares/registerValidation.ts
var registerValidation = async (req, res, next) => {
  const { userName, userEmail, userPass, userConfirmPass } = req.body;
  const user = await userModel_default.findOne({ userEmail });
  const userN = await userModel_default.findOne({ userName });
  if (userN)
    return res.status(401).json({
      message: `${userName} n\xE3o n\xE3o est\xE1 dispon\xEDvel como nome de usu\xE1rio.`,
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

// src/middlewares/loginValidation.ts
var bcrypt2 = require("bcrypt");
var loginValidation = async (req, res, next) => {
  const { userName, userPass } = req.body;
  const user = await userModel_default.findOne({ userName });
  if (!user)
    return res.status(401).json({
      message: `Usu\xE1rio ${userName} n\xE3o registrado no sistema`,
      isSucess: false
    });
  const checkPassword = await bcrypt2.compare(userPass, user.userPass);
  if (!checkPassword)
    return res.status(401).json({
      message: "Senha incorreta",
      isSucess: false
    });
  next();
};

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

// src/middlewares/chekToken.ts
var jwt2 = require("jsonwebtoken");
var checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null)
    return res.status(401).json({ message: "Acesso negado", status: false });
  try {
    const secret = process.env.secret;
    const authData = jwt2.verify(token, secret);
    return res.status(200).json({ authData });
  } catch (error) {
    return res.status(400).json({ message: "Token Inv\xE1lido", status: false });
  }
};

// src/middlewares/checkAuth.ts
var jwt3 = require("jsonwebtoken");
var checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null)
    return res.status(401).json({ message: "Acesso negado", status: false });
  try {
    const secret = process.env.secret;
    const authData = jwt3.verify(token, secret);
    console.log(authData);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token Inv\xE1lido", status: false });
  }
};

// src/routes.ts
var routes = (0, import_express.Router)();
routes.post("/register", registerValidation, userController_default.userRegister);
routes.post("/login", loginValidation, userController_default.userLogin);
routes.get("/getdraws", drawController_default.getAllDraws);
routes.get("/getdraws/:section", drawController_default.getSomeDraw);
routes.post("/store", drawController_default.store);
routes.get("/auth", checkToken);
routes.post("/likepost/:iduser/:idpost", checkAuth, userController_default.userLikePost);
routes.post("/deslikepost/:iduser/:idpost", checkAuth, userController_default.userDeslikePost);
routes.post("/insert/:userid/:postid/:commentary", checkAuth, userController_default.userComment);
routes.get("/getcomments/:id", userController_default.getComments);
routes.post("/dropcomment/:idcomment/:idpost", checkAuth, userController_default.dropComment);
var routes_default = routes;
