const User = require("../models/user");
const { getAll, deleteOne, updateOne } = require("../controllers/generic");
const { createOne, signIn } = require("../controllers/auth");

exports.signUpUser = createOne(User);

exports.signInUser = signIn(User);

exports.getUsers = getAll(User);

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

exports.deleteUser = deleteOne(User);

exports.updateUser = updateOne(User);
