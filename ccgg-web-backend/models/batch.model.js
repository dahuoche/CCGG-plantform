import mongoose, { Schema } from 'mongoose';

const BatchSchema = new Schema({
    focus: {type: String, required: true},
    batch: {type: String, required: true},
    trainer: {type: String, required: true}
}, {collection: 'ccgg-batches'});

export default mongoose.model('Batch', BatchSchema);
