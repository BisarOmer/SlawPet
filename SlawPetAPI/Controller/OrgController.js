const OrgModel = require("../Model/OrgModel");

exports.about = (req, res) => {
    OrgModel.about(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};

exports.donate = (req, res) => {
    OrgModel.donate(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};

exports.adopted = (req, res) => {
    OrgModel.adopted(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};

exports.viewAsk = (req, res) => {
    OrgModel.viewAsk(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};


exports.give = (req, res) => {
    OrgModel.give(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};


exports.cancel = (req, res) => {
    OrgModel.cancel(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};