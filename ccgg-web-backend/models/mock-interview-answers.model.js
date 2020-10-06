import mongoose, { Schema } from 'mongoose';

const MockInterviewAnswersSchema = new Schema({
    result: {type: Schema.Types.ObjectId, required: true, ref: 'MockInterviewResultSchema'},
    answer: {type: String},
    audio: {type: String},
    question: {type: Schema.Types.ObjectId, required: true, ref: 'MockInterviewQuestions'}
}, {collection: 'ccgg-mock-interview-answers'});

export default mongoose.model('MockInterviewAnswers', MockInterviewAnswersSchema);
