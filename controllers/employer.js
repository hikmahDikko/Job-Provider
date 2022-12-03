const Employer = require("../models/employer");
const User = require("../models/user");
const { getOne, updateOne, deleteOne } = require("../controllers/generic");
const { createOne, signIn } = require("../controllers/auth");

exports.signUpEmployer = createOne(Employer);

exports.signInEmployer = signIn(Employer);

exports.getUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id).populate("");
    res.status(200).json({
        data
    });
    } catch (error) {
    res.status(400).json({
        status: "fail",
        message: error,
    });
    }
};

exports.getEmployer = getOne(Employer);

exports.deleteEmployer = deleteOne(Employer);

exports.updateEmployer = updateOne(Employer);