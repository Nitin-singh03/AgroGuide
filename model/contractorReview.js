const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorReview = new Schema({
    Contractor: {
        type: Schema.Types.ObjectId,
        ref: 'Contractor',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    comment: String,
}, { timestamps: true });

const ContractorReview = mongoose.model('ContractorReview', contractorReview);
module.exports = ContractorReview;
