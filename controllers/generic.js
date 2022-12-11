const QueryMethod = require("../utils/query");

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

exports.updateOne = (model) => {
    return async (req, res) => {
        try {
            const payload = req.body;

            const updatedData = await model.findByIdAndUpdate(req.params.id, {...payload});

            res.status(200).json({
              status: "success",
              message : "Data successfully updated",
              data: {
                updatedData
              },
            });
        } catch (error) {
            console.log(error);
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
            console.log(err);
        }
    }
};