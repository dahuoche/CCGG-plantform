import mongoose, { Schema } from 'mongoose';

const MockInterviewQuestionsSchema = new Schema({
    no: {type: Number, required: true},
    description: {type: String, required: true},
    coding: {type: Boolean, required: true},
    extra_description: {type: String},
    batch: {type: Schema.Types.ObjectId, ref: 'BatchSchema'},
    question_tags: [{ type: Schema.Types.ObjectId, ref: 'QuestionTag'}]
}, {collection: 'ccgg-mock-interview-questions'});

export default mongoose.model('MockInterviewQuestions', MockInterviewQuestionsSchema);
