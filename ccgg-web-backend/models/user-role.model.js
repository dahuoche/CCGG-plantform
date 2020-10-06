import mongoose, { Schema } from "mongoose";

const UserRoleSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
}, {collection: 'ccgg-user-roles'});

export default mongoose.model('UserRole', UserRoleSchema);
