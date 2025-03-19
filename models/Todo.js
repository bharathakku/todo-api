const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 3 },
        completed: { type: Boolean, default: false }
    },
    { timestamps: true } // Adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Todo", TodoSchema);
