import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userModel = new Schema({
    userName: String,
    userLastName: String,
    userEmail: String,
    pass: String
});

const User = mongoose.model('User', userModel);

export default User;
