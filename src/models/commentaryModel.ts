import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const   CommentaryModel = new Schema ({
    commentary: String,
    userName: String,
    idUser: String,
    idPost: String,
})

const Commentary = mongoose.model('comment', CommentaryModel);

export default Commentary;