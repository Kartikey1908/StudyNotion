const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : "User",
    },
    course: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required : true,
    },
    rating : {
        type : Number,
        requried : true,
    },
    review : {
        type : String, 
        requried : true,
    }
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);