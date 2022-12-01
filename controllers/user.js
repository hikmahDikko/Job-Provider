const User = require("../models/user");
const { authErrors } = require("../error_handler/error");
const { getAll, getOne, deleteOne } = require("../controllers/generic");
const { createOne, signIn } = require("../controllers/auth");

exports.signUpUser = createOne(User);

exports.signInUser = signIn(User);

exports.getUsers = getAll(User);

exports.getUser = getOne(User);

exports.deleteUser = deleteOne(User);

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(400).json({
            status: "fail",
            message: `There is no user with the ID ${req.params.id}`,
          });
        }
        const firstName = req.body.firstName === undefined ? user.firstName : req.body.firstName;
        const lastName = req.body.lastName === undefined ? user.lastName : req.body.lastName;
        const middleName = req.body.middleName === undefined ? user.middleName : req.body.middleName;
        const email = req.body.email === undefined ? user.email : req.body.email;
        const phoneNumber = req.body.phoneNumber === undefined ? user.phoneNumber : req.body.phoneNumber;
        const address = req.body.address === undefined ? user.address : req.body.address;
        const experience = req.body.experience === undefined ? user.experience : req.body.experience;
        const skill = req.body.skill === undefined ? user.skill : req.body.skill;
        const profileImage = req.body.profileImage === undefined ? user.profileImage : req.body.profileImage;
        const update = { firstName, lastName, middleName, email, address, phoneNumber, experience, skill, profileImage };
        const updatedUser = await User.findByIdAndUpdate(req.params.id, update);
        res.status(200).json({
          status: "success",
          data: {
            updatedUser
          },
        });
    } catch (error) {
      console.log(error)
        const errors = authErrors(error)
        res.status(400).json({ errors });
    }
}
