import mongoose from "mongoose";
import _default from "./default";

export default async function startDB() {
    const url = `mongodb+srv://${_default.dbUser}:${_default.dbPass}@cluster0.gc4ly0f.mongodb.net/users_RC?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(url);
        console.log("Connect at MongoDB")
    } catch (error) {
        console.log('Erro na conexão com o MongoDB');
    }
}