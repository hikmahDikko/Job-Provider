exports.confirmData = (model) => { 
    return async (req, res, next) => {
        const data = await model.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                status: "fail",
                message: `There is no data with the ID ${req.params.id}`,
            });
        }

        next();
    }
};

exports.check = (model) => { 
    return async (req, res, next) => {
        let userId = req.user.id
        const data = await model.findById(req.params.id);
       
        if (userId !== req.params.id) {
            return res.status(400).json({
                status: "fail",
                message: "You're not authorized to perform this action",
            });
        }
        
        next();
    }
};
