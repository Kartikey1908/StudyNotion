
const Category = require("../models/Categories");
const Course = require("../models/Course");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
    try {
        
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const categoryDetails = await Category.create({
            name: name, 
            description : description,
        })

        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.showAllCategories = async (req, res) => {
    try {
        
        const allCategories = await Category.find(); // this tells name and description should be present in the tag

        res.status(200).json({
            success:true,
            message: "All categories returned successfully",
            data : allCategories,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })   
    }
};

exports.categoryPageDetails = async(req, res) => {
    try {
        // get category id
        console.log("category id")
        const {categoryId} = req.body;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category Id should be sent"
            })
        }

        // get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                .populate({
                                    path:"courses",
                                    match: {status: "Published"},
                                    // populate: "ratingAndReviews"
                                    populate: "instructor"
                                })
                                
                                .exec();    
        // validate
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category Not found',
            });
        }

        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category")
            return res.status(404).json({
                sucesss: false,
                message: "No courses found for the selected category.",
            })
        }

        // get courses for different categories
        const categoriesExceptSelected = await Category.find({
                                            _id : {$ne: categoryId},
                                        })
        let differentCategory = null;
        while (!(differentCategory?.courses?.length > 0)) {
            differentCategory = await Category.findOne(
                {_id: categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id}
            )
            .populate({
                path: "courses",
                match: {status: "Published"},
                populate: "instructor"
            })
            .exec()
        }
        
        
        
        const allCategories = await Category.find()
                                    .populate({
                                        path: "courses",
                                        match: {status: "Published"},
                                        populate: "instructor",
                                    })
                                    .exec()
        const allCourses = allCategories.flatMap( (category) => category.courses);

        const mostSelling = allCourses
                            .sort((a, b) => a.studentsEnrolled.length - b.studentsEnrolled.length)
                            .slice(0, 10)

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSelling
            },
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Could not fetch data of category, please try again later.'
        })
    }
}

