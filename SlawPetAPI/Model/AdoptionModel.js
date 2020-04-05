const sql = require("../Config/config");
var fs = require('fs');

const Adoption = function (adoption) {
    this.account_id = adoption.account_id;
    // this.img = adobtion.img;
    this.name = adoption.name;
    this.age = adoption.age;
    this.gender = adoption.gender;
    this.city = adoption.city;
    this.pet = adoption.pet;
    this.content = adoption.content;
    date = Date(Date.now()).toString();
}


// post an adobtion
Adoption.create = (newAdoption, result) => {

    sql.query("INSERT INTO adoption SET ?", newAdoption, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, {
            "status": "success",
            "code": "200",
            "message": "Adoption Added"
        });

    });

};

Adoption.getAll = result => {
    sql.query("select adoption.`account_id`,adoption.`adoption_id`,adoption.`img`,adoption.`name` as title,adoption.`age`,adoption.`gender`,adoption.`city`,adoption.`pet`,adoption.`content`,adoption.`date`,adoption.`status`,user.name as owner,user.profile from user INNER JOIN adoption on adoption.account_id=user.account_id where status != 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });

};

Adoption.findByid = (id, result) => {
    sql.query("select adoption.`account_id`,adoption.`adoption_id`,adoption.`img`,adoption.`name` as title,adoption.`age`,adoption.`gender`,adoption.`city`,adoption.`pet`,adoption.`content`,adoption.`date`,adoption.`status`,user.name as owner,user.profile from user INNER JOIN adoption on adoption.account_id=user.account_id and adoption.adoption_id=? ", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }
    });
};

Adoption.findByCity = (city, result) => {
    sql.query("SELECT * FROM `adoption` WHERE city = ? and status != 1 ", city, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
    });
};

Adoption.findByPet = (pet, result) => {
    sql.query("SELECT * FROM `adoption` WHERE pet = ? and status != 1 ", pet, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }
    }
    );
};

Adoption.findByPetandCity = (pet, city, result) => {
    sql.query("SELECT * FROM `adoption` WHERE city=? and pet = ? and status != 1 ", [city, pet], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }
    }
    );
};

Adoption.findByOrg = (org_id, result) => {
    sql.query("select account_id,adoption_id,img,name,city from adoption where account_id= ? and status != 1 ", org_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);

    }

    );

};

Adoption.myAdoptions = (req, result) => {
    sql.query("select * from adoption where account_id= ?", req.decoded.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);

    }

    );

};

Adoption.myAdoptionsByID = (req, result) => {
    sql.query("select adoption.`account_id`,adoption.`adoption_id`,adoption.`img`,adoption.`name` as title,adoption.`age`,adoption.`gender`,adoption.`city`,adoption.`pet`,adoption.`content`,adoption.`date`,adoption.`status`,user.name as owner,user.profile from user INNER JOIN adoption on adoption.account_id=user.account_id and adoption.adoption_id=? ", req.body.Adoption_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res[0]);

    }

    );

};

Adoption.deleteAdoption = (req, result) => {
    sql.query("delete from adoption where adoption_id = ? and account_id=?", [req.body.Adoption_id, req.decoded.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        else {
            fs.unlink('./images/' + req.body.img, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            result(null, { "message": "deleted" });
        }
    }
    );

};

Adoption.ask = (req, result) => {
    sql.query("insert into adopted (adopter_id,adoption_id,saver_id) values(?,?,?); update adoption set status=1 where adoption_id=?", [req.decoded.id, req.body.Adoption_id, req.body.saver_id, req.body.Adoption_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { "message": "Adopted" });

    }

    );

};

Adoption.count = (req, result) => 
{
    sql.query("SELECT COUNT(account_id) as NumAdoptions FROM adoption WHERE account_id=?",req.body.account_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        else{
            result(null, res[0]);
        }
    });
}

Adoption.countAdopted = (req, result) => {
    sql.query("SELECT COUNT(saver_id) as NumAdopted FROM adopted WHERE saver_id = ? and status !=1",req.body.account_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        else{
             result(null, res[0]);
        }
       
    });
}

module.exports = Adoption;