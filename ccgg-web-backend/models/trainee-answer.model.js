import mongoose, { Schema } from 'mongoose';

const TraineeAnswerSchema = new Schema({
    answer: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, required: true, ref: 'Question'},
    status: {type: String, required: true},
    submitted: {type: Boolean, required: true},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
}, {collection: 'ccgg-trainee-answer'});

export default mongoose.model('TraineeAnswer', TraineeAnswerSchema);
