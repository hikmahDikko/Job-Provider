//handle errors
exports.authErrors = (err) => {
    let errors = { firstName : "", lastName : "", middleName : "", email : "", password : "", confirmPassword : ""};

    //duplicate error code
    if(err.code === 11000) {
        errors.email = "email already registered";

        return errors;
    }
    
    //validate errors
    if(err.message.includes('User validation failed' )) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    if(err.message.includes('Employer validation failed' )) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}

exports.jobErrors = (err) => {
    let errors = { employerId : "", companyName : "", title : "", salary : "", companyWebsite : "", category : "", location : "", address : "", development : "", workExperience : "", description : "", address : "", jobType : "", companyType : "", workType : ""};

    //validate errors
    if(err.message.includes('Job validation failed' )) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    };

    return errors;
}
