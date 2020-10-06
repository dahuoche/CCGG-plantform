import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {type: String, required: true},
  batch: {type: Schema.Types.ObjectId, ref: 'Batch'},
  email: {type: String, unique: true, required: true},
  address: {type: String},
  role: {type: Schema.Types.ObjectId, ref: 'UserRole'},
  phone: {type: Number},
  password: {type: String, required: true},
  active: {type: Number, required: true},
}, {collection: 'ccgg-batch-users'});

export default mongoose.model('User', UserSchema);
