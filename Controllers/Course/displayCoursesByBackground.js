const { Course } = require("../../Models/Course");

exports.displayCourseByBackground = async function (req, res, next) {
    const course = await Course.find({ background: req.params.background })
        .populate("modules")
        .populate("comments.user rating.user", "-_id")
        .select();

    res.send(course);
};