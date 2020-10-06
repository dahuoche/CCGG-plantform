import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
    No: {type: Number, required: true, unique: true},
    description: {type: String, required: true},
    suggested_answer: {type: String},
    extra_description: {type: String},
    question_tags: [{ type: Schema.Types.ObjectId, ref: 'QuestionTag'}],
}, {collection: 'ccgg-questions'});

export default mongoose.model('Question', QuestionSchema);
