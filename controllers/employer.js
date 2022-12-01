const Employer = require("../models/employer");
const { authErrors } = require("../error_handler/error");
const { getAll, getOne, deleteOne } = require("../controllers/generic");
const { createOne, signIn } = require("../controllers/auth");

exports.signUpEmployer = createOne(Employer);

exports.signInEmployer = signIn(Employer);

exports.getEmployers = getAll(Employer);

exports.getEmployer = getOne(Employer);

exports.deleteEmployer = deleteOne(Employer);

exports.updateEmployer = async (req, res) => {
    try {
        const user = await Employer.findById(req.params.id);
        if (!user) {
          return res.status(400).json({
            status: "fail",
            message: `There is no user with the ID ${req.params.id}`,
          });
        }
        
        const firstName = req.body.firstName === undefined ? user.firstName : req.body.firstName;
        const lastName = req.body.lastName === undefined ? user.lastName : req.body.lastName;
        const middleName = req.body.middleName === undefined ? user.middleName : req.body.middleName;
        const companyName = req.body.companyName === undefined ? user.companyName : req.body.companyName;
        const email = req.body.email === undefined ? user.email : req.body.email;
        const phoneNumber = req.body.phoneNumber === undefined ? user.phoneNumber : req.body.phoneNumber;
        const profileImage = req.body.profileImage === undefined ? user.profileImage : req.body.profileImage;
        const update = { firstName, lastName, middleName, companyName, email, phoneNumber, profileImage };
        const updatedUser = await Employer.findByIdAndUpdate(req.params.id, update);
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