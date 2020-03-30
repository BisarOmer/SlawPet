const OrgModel = require("../Model/OrgModel");

exports.about = (req, res) => {
    OrgModel.about(req.params.id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};

exports.donate = (req, res) => {
    OrgModel.donate(req.params.id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};

exports.adopted = (req, res) => {
    OrgModel.adobted(req.params.id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};