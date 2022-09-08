import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateEnded: {
        type: Date,
        default: Date.now,
    },
})

todoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

todoSchema.set('toJSON', {
    virtuals: true,
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
