import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userModel = new Schema({
    userName: String,
    userEmail: String,
    userPass: String
});

const User = mongoose.model('User', userModel);

export default User;
