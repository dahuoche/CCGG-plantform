import mongoose, { Schema } from 'mongoose';

// 一进mock interview 生成一个  记录用户 日期 第几次答
const MockInterviewResultSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    result: {type: String, required: true},
    date: {type: String, required: true}
}, {collection: 'ccgg-mock-interview-result'});

export default mongoose.model('MockInterviewResult', MockInterviewResultSchema);
