const sql = require("../Config/config");

const Org=function(){

};

Org.about = (id, result) => {
    sql.query("select org.account_id,address,certification,user.phoneNumber  from organization as org inner join user on Org.account_id=?", id, (err, res) => {
        if (err) {
            console.log("erroe: ", err)
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found about org: ", res[0]);
            result(null, res[0]);
            return;
          }


    });
};

Org.donate=(id,result)=>{
    sql.query("select qrCode from organization where account_id=?", id, (err, res) => {
        if (err) {
            console.log("erroe: ", err)
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found donate org: ", res[0]);
            result(null, res[0]);
            return;
          }


    });

}

Org.adopted=(id,result)=>{
    sql.query("select org_id,account_id,adoption_id,date from adopted where org_id =?",id,(err,res)=>{
        if (err) {
            console.log("error: ", err)
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found donate org: ", res[0]);
            result(null, res[0]);
            return;
          }
    });
};

module.exports=Org;