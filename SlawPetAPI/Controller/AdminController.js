const sql = require("../Config/config");
const jwt = require("jsonwebtoken");



exports.signin = (req, res) => {

    var password = req.body.password;
    var username = req.body.username;

    sql.query("select user_id,username,password from administration where username = ? and password = ? ", [username, password], (err, selected) => {

        if (err) {
            console.log("error: ", err);
            res.send(err);
            return;
        }

        else {

            if (!selected.length) {
                res.send({ "status": false, "message": "Username or Password is wrong" });
                return;
            }
            else {
                var token = jwt.sign({ id: selected[0].user_id, role: "Admin" }, 'biisar123', { expiresIn: "7 days" });
                res.send({ "status": true, "token": token });
                return;
            }
        }

    });


};


exports.users = (req, res) => {
    sql.query("select name,profile,account_id,disable from user where accType != 'Organization' ", (err, selected) => {
        if (err) {
            console.log("error: ", err);
            res.send(err);
            return;
        }
        else {
            res.send({ selected });
            return;
        }
    })
}

exports.disableAccount = (req, res) => {
    if (req.decoded.role == "Admin") {
        sql.query("update user set  disable=1 where account_id=?", req.body.account_id,(err, selected) => {
            if (err) {
                console.log("error: ", err);
                res.send(err);
                return;
            }
            else {
                res.send({ status: true, message: "Disabled" });
                return;
            }
        })
    }

    else {
        res.send({ status: false, message: "Bad request" });
        return;
    }

}

exports.enableAccount = (req, res) => {
    if (req.decoded.role == "Admin") {
        sql.query("update user set  disable=0 where account_id=?", req.body.account_id,(err, selected) => {
            if (err) {
                console.log("error: ", err);
                res.send(err);
                return;
            }
            else {
                res.send({ status: true, message: "Disabled" });
                return;
            }
        })
    }

    else {
        res.send({ status: false, message: "Bad request" });
        return;
    }

}


exports.deleteAdoption = (req, res) => {
    if (req.decoded.role == "Admin") {
        sql.query("delete from adoption where adoption_id=?", req.body.adoption_id,(err, selected) => {
            if (err) {
                console.log("error: ", err);
                res.send(err);
                return;
            }
            else {
                res.send({ status: true, message: "Deleted" });
                return;
            }
        })
    }

    else {
        res.send({ status: false, message: "Bad request" });
        return;
    }

}




exports.dashboard = (req, res) => {
    if (req.decoded.role == "Admin") {
        sql.query("select count(account_id) as OrgNumber from organization; "+
                  "select count(adoption_id) as adopted from adopted where status=1;"+
                  "select count(adoption_id) as Hawler from adoption where city='hawler';"+
                  +"select count(adoption_id) as Slemmni from adoption where city='slemni'; ",(err, selected) => {
            if (err) {
                console.log("error: ", err);
                res.send(err);
                return;
            }
            else {
                res.send(selected);
                return;
            }
        })
    }

    else {
        res.send({ status: false, message: "Bad request" });
        return;
    }

}