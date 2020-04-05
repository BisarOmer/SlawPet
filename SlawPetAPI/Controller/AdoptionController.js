const AdoptionModel = require("../Model/AdoptionModel");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const adoption = new AdoptionModel({
        account_id: req.decoded.id,
        name:req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city,
        pet: req.body.pet,
        content: req.body.content,
    });

    AdoptionModel.create(adoption, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the adobtiion."
            });
        else res.send(data);
    });
};

exports.allAdobtion=(req,res)=>{
    AdoptionModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adobtion."
            });
        else res.send(data);
    });
};

exports.adobtionByid=(req,res)=>{
    AdoptionModel.findByid(req.params.id,(err,data)=>{
        if(err){
            res.send(console.log("error:",err))
        }
        else
        res.send(data);
    });   
};
exports.adobtoinBypet=(req,res)=>{
    AdoptionModel.findByPet(req.params.pet,(err,data)=>{
        if(err){
            res.status(500);
            res.send("error",err)
        }
        else
        res.send(data);
    })
};
exports.adobtoinBycity=(req,res)=>{
    AdoptionModel.findByCity(req.params.city,(err,data)=>{
        if(err){
            res.status(500);
            res.send("error",err)
        }
        else
        res.send(data);
    })
};
exports.adobtoinBypetandCity=(req,res)=>{
    AdoptionModel.findByPetandCity(req.params.pet,req.params.city,(err,data)=>{
        if(err){
            res.status(500);
            res.send("error",err)
        }
        else
        res.send(data);
    })
};
exports.adobtoinByorg=(req,res)=>{
    AdoptionModel.findByOrg(req.params.org_id,(err,data)=>{
        if(err){
            res.status(500);
            res.send("error",err)
        }
        else
        res.send(data);
    })
};
exports.myAdoptions=(req,res)=>{
    AdoptionModel.myAdoptions(req,(err,data)=>{
        if(err){
            res.status(500);
            res.send("error",err)
        }
        else
        res.send(data);
    })
};

exports.myAdoptionsByID=(req,res)=>{
    AdoptionModel.myAdoptionsByID(req,(err,data)=>{
        if(err){
            res.send(console.log("error:",err))
        }
        else
        res.send(data);
    });   
};

exports.ask=(req,res)=>{
    AdoptionModel.ask(req,(err,data)=>{
        if(err){
            res.send(console.log("error:",err))
        }
        else
        res.send(data);
    });   
};

exports.deleteAdoption=(req,res)=>{
    AdoptionModel.deleteAdoption(req,(err,data)=>{
        if(err){
            res.send(console.log("error:",err))
        }
        else
        res.send(data);
    });   
};


exports.count=(req,res)=>{
    AdoptionModel.count(req,(err,data)=>{
        if(err){
            res.send(console.log("error:",err))
        }
        else
        res.send(data);
    });   
};


exports.countAdopted=(req,res)=>{
    AdoptionModel.countAdopted(req,(err,data)=>{
        if(err){
            res.send(console.log("error:",err))
        }
        else
        res.send(data);
    });   
};



