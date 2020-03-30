const sql = require("../Config/config");
const jwt = require("jsonwebtoken");

// constructor
const Account = function (account) {
  this.name = account.name;
  this.email = account.email;
  this.password = account.password;
  this.profile = account.profile;
  this.phoneNumber = account.phoneNumber;
  this.accType = account.accType;
  this.date = Date(Date.now()).toString();
}

// create user 
Account.create = (newAccount, result) => {

  sql.query("SELECT email from user where email=? ", newAccount.email, (err, res) => {
    if (err) {
      console.log("error: ", errr);
      result(err, null);
      return;
    }
    else {

      if (res.length > 0) {
        result(null, { "status": false, "message": "Email : " + res[0].email + " is  duplicate" });
        return;
      }
      else if (res.length == 0) {

        sql.query("INSERT INTO user SET ?", newAccount, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          result(null, { id: res.insertId, ...newAccount });
        });

      }

    }
  });

};

Account.OrgAll = result => {
  sql.query("SELECT user.account_id,name,profile FROM `user` inner join organization as org on user.account_id=org.account_id ORDER BY name  ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("adobtiones: ", res);
    result(null, res);
  });

};

Account.OrgByid = (id, result) => {
  sql.query("SELECT user.account_id,name,profile FROM `user` inner join organization as org on user.account_id=org.account_id and org.account_id= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Account.OrgByName = (name, result) => {
  sql.query("SELECT user.account_id,name,profile FROM `user` inner join organization as org on user.account_id=org.account_id  where user.name like ?", name+"%", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Account.signin = (req, result) => {
  var password = req.body.password;
  var email = req.body.email;

  if (email != undefined && password != undefined) {
    sql.query("select account_id,accType from user where email = ? and password = ?", [email, password], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      else {
        if (!res.length) {
          result(null, { "status": false, "message": "Email or Password is wrong" });
          return;
        }

        else {
          var token = jwt.sign({ id: res[0].account_id }, 'biisar123', { expiresIn: "7 days" });
          result(null, { "status": true, "token": token, "AccountType": res[0].accType });
          return;
        }

      }

    });
  }

  else {
    console.log("error: ", err);
    result(null, err);
  }


};

Account.me = (req, result) => {

  sql.query("SELECT account_id,name,email,profile,phoneNumber,accType FROM `user` where account_id = ?", req.decoded.id, (err, res) => {
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

Account.meOrg = (req, result) => {

  sql.query("SELECT * FROM `organization` where account_id = ?", req.decoded.id, (err, res) => {
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

Account.update = (req, result) => {
  sql.query("SELECT email from user where email=? and account_id !=? ", [req.body.email, req.decoded.id], (err, res) => {
    if (err) {
      console.log("error: ", errr);
      result(err, null);
      return;
    }
    else {
      if (res.length > 0) {
        result(null, { "status": false, "message": "Email : " + res[0].email + " is  duplicate" });
        return;
      }
      else if (res.length == 0) {
        sql.query("update user set name=?,email=?,phoneNumber=? where account_id = ?",
          [req.body.name, req.body.email, req.body.phoneNumber, req.decoded.id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            result(null, { "status": true, "message": " successfully update " });
          });

      }

    }
  });

};

Account.updatepassword = (req, result) => {
  sql.query("update user set password=? where account_id = ?",
    [req.body.password, req.decoded.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { "status": true, "message": " successfully password updated " });
    });
};

Account.updateAddress = (req, result) => {
  sql.query("update organization set address=? where account_id = ?",
    [req.body.address, req.decoded.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { "status": true, "message": " successfully Address updated " });
    });
};

module.exports = Account;