const AccountModel = require("../Model/AccountModel");
const sql = require("../Config/config");



// create accont
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Account
    const account = new AccountModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber,
        accType: req.body.accType
    });

    // Save Account in the database
    AccountModel.create(account, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the account."
            });
        else res.send(data);
    });

};

// return org 
exports.getAllOrg = (req, res) => {
    AccountModel.OrgAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all org."
            });
        else res.send(data);
    });
}

exports.findByid = (req, res) => {
    AccountModel.OrgByid(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
}

exports.findByName = (req, res) => {
    AccountModel.OrgByName(req.params.name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
}

exports.signin = (req, res) => {
    AccountModel.signin(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
};

exports.me = (req, res) => {
    AccountModel.me(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
};

exports.meOrg = (req, res) => {
    AccountModel.meOrg(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    AccountModel.update(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
};

exports.updatepassword = (req, res) => {
    AccountModel.updatepassword(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
};

exports.updateaddress = (req, res) => {
    AccountModel.updateAddress(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving org."
            });
        else res.send(data);
    });
};

exports.upload = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({
                "status": "failed",
                "code": "400",
                "message": "Please upload file"
            });
        }
        res.status(200).json({
            "status": "success",
            "code": "200",
            "message": "file uploaded successfully"
        });
        if(req.body.typeUpload=="/upload/Profile")
        sql.query("update user set profile = ? where account_id = ?",[req.photo,req.decoded.id]);
        else if(req.body.typeUpload=="/upload/Certification")
        sql.query("update organization set certification = ? where account_id = ?",[req.photo,req.decoded.id]);
        else if(req.body.typeUpload=="/upload/Donate")
        sql.query("update organization set qrCode = ? where account_id = ?",[req.photo,req.decoded.id]);
        else if(req.body.typeUpload=="/upload/AdoptionImage")
        sql.query("update adoption set img = ? where account_id = ?",[req.photo,req.decoded.id]);

    } catch (err) {
        console.log(err.message);
        res.status(200).json({
            "status": "failed",
            "code": "500",
            "message": err.message
        });
    }
};


