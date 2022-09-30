const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    price: {
        type: String,
    },

});

module.exports = mongoose.model("Subcategories", subCategorySchema);
