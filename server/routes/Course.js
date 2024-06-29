const express = require('express');
const router = express.Router();

const {
    auth, 
    isAdmin,
    isStudent,
    isInstructor
} = require('../middlewares/auth');

const {
    createCourse,
    getAllCoures,
    getCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getFullCourseDetails,
} = require('../controllers/Course');

const {
    createCategory,
    showAllCategories,
    categoryPageDetails,
} = require("../controllers/Category");

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/Subsection");
const { 
    updateCourseProgress 
} = require('../controllers/CourseProgress');

const {
    createRating,
    getAllRating
} = require("../controllers/RatingAndReview");



router.post("/createCourse", auth, isInstructor,createCourse);
router.get("/getAllCoures", auth, getAllCoures);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.put("/editCourse", auth,editCourse);
router.delete("/deleteCourse", auth,deleteCourse);



router.post("/createCategory", auth, isAdmin,createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/addSection", auth, isInstructor,createSection);
router.put("/updateSection", auth, isInstructor,updateSection);
router.delete("/deleteSection", auth, isInstructor,deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// course progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// rating and review
router.post("/createRating", auth, isStudent, createRating);
router.get("/getReviews", getAllRating);


module.exports = router;