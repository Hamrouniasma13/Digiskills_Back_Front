const { Training } = require("../../Models/Training");

exports.allTrainings = async function (req, res, next) {
    const page = req.query.page;
    const perPage = 20;
    const query = req.query.title;

    if (!query) {
        const allTrainings = await Training.find();
        res.send(allTrainings);
    }

    const count = await Training.find({
        title: { $regex: query, $options: "i" }
    }).count();

    // search for a course
    const training = await Training.find({
        title: { $regex: query, $options: "i" }
    })
        .select()

        // pagination
        .limit(perPage)
        .skip((page - 1) * perPage);

    res.send({ training, count });
};
