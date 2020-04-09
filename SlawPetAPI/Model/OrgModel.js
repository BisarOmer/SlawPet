const sql = require("../Config/config");

const Org=function(){

};

Org.about = (id, result) => {
    sql.query("select org.account_id,address,certification,user.account_id,user.phoneNumber  from organization as org inner join user on org.account_id=? and Org.account_id=user.account_id ", id, (err, res) => {
        if (err) {
            console.log("erroe: ", err)
            result(null, err);
            return;
        }
        if (res.length) {
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
            result(null, res[0]);
            return;
          }


    });

}

Org.adopted=(req,result)=>{
    sql.query("select adopted.saver_id,adopted.adopter_id,adopted.adoption_id,adopted.date,user.name as asker,user.profile from user INNER JOIN adopted on adopted.adopter_id=user.account_id and adopted.saver_id=? and status!=1",req.decoded.id,(err,res)=>{
        if (err) {
            console.log("error: ", err)
            result(null, err);
            return;
        }
        else if (res.length) {
            result(null,{ "status":true,res});
            return;
          }
          else{
              result(null,{"status":false,"messege":"No ask to show"})
          }
    });
};

Org.viewAsk=(req,result)=>{
    sql.query("select adoption.adoption_id,adoption.name,adoption.img, user.name as asker,user.profile,user.phoneNumber,adopted.adopter_id,adopted.adoption_id"
               +" from adopted INNER JOIN adoption on adoption.adoption_id=adopted.adoption_id  inner join user on user.account_id=adopted.adopter_id where adoption.adoption_id=? and adopted.saver_id=?",[req.body.Adoption_id,req.decoded.id],(err,res)=>{
        if (err) {
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
          }
    });
};

Org.give=(req,result)=>{
    sql.query("update adopted set status = 1 where adoption_id=? and saver_id=? ",[req.body.Adoption_id,req.decoded.id],(err,res)=>{
        if (err) {
            result(null, err);
            return;
        }
        else{
            result(null, {"status":true,"messege":"Adopted by"});
            return;
        }
    });
};

Org.cancel=(req,result)=>{
    sql.query("delete from adopted  where adoption_id=? and saver_id=? ; update adoption set status = 0 where adoption_id=? and account_id=? ",[req.body.Adoption_id,req.decoded.id,req.body.Adoption_id,req.decoded.id],(err,res)=>{
        if (err) {
            result(null, err);
            return;
        }
        else{
            result(null, {"status":true,"messege":"canceled"});
            return;

        }
    });
};

module.exports=Org;