import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const drawModel = new Schema ({
    title: String,
    font: String,
    data: String,
    description: String,
    categories: Array,
    url: Array,
    usersLiked: Array,
    usersComments: Array
})

const Draw = mongoose.model('draws', drawModel);

export default Draw;