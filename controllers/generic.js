const QueryMethod = require("../utils/query");

exports.getAll = (model) => {
    return async (req, res) => {
        try {
        let queriedUsers = new QueryMethod(model.find(), req.query)
            .sort()
            .filter()
            .limit()
            .paginate();
            let users = await queriedUsers.query;
            res.status(200).json({
                status: "success",
                results: users.length,
                data: users,
            }); 
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error,
            });
        }
    }
}

exports.getOne = (model) => {
    return async (req, res) => {
        try {
        const user = await model.findById(req.params.id);
        res.status(200).json({
            data: {
            user,
            },
        });
        } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
        }
    }
}

exports.deleteOne = (model) => {
    return async (req, res) => {
        try {
            const del = await model.findByIdAndDelete(req.params.id);

            if(del) {
                return res.status(204).send();
            }else{
                return res.status(404).send({
                    status : false,
                    message : "Account cannot be fetched"
                })
            }
        }catch (err) {
            const errors = handleError(err)
            res.status(400).json({ errors });
        }
    }
}