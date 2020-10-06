import mongoose, { Schema } from 'mongoose';

const QuestionTagSchema = new Schema({
    name: {type: String, required: true},
}, {collection: 'ccgg-question-types'});

export default mongoose.model('QuestionTag', QuestionTagSchema);
