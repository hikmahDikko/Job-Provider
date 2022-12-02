const QueryMethod = require("../utils/query");
const { authErrors } = require("../error_handler/error");

exports.getAll = (model) => {
    return async (req, res) => {
        try {
        let queriedUsers = new QueryMethod(model.find(), req.query)
            .sort()
            .filter()
            .limit()
            .paginate();
            let datas = await queriedUsers.query;
            res.status(200).json({
                status: "success",
                results: datas.length,
                datas
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
        const data = await model.findById(req.params.id);
        res.status(200).json({
            data
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
                    message : "Data cannot be fetched"
                })
            }
        }catch (err) {
            const errors = authErrors(err)
            res.status(400).json({ errors });
        }
    }
}