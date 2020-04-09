const sql = require("../Config/config");

const Comment = function (comment) {
    this.account_id = comment.account_id;
    this.adoption_id = comment.adoption_id;
    this.content = comment.content;
    this.date = new Date().toJSON().slice(0, 19).replace('T', ' ');

};

Comment.postComment = (comment, result) => {
    sql.query("INSERT INTO comment SET ?", comment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {"message":"happy commenting" });
    });
};

Comment.commentByAdobtion = (adobtion_id, result) => {
    sql.query("SELECT comment.`adoption_id`,comment.`comment_id`,comment.`content`, user.name ,user.profile,user.account_id from user INNER JOIN comment on user.account_id=comment.account_id where comment.`adoption_id`=?", adobtion_id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.length) {
            result(null,{"status":"true",res});
            return;
        }

        else{
            result(null, {"status":"false","message":"No Comment"});
            return;
        }
    });
};

Comment.deleteComment=(req,result)=>{
    sql.query("delete from  comment where comment_id = ? and account_id= ?", [req.body.comment_id,req.decoded.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result({ message: `comment  deleted successfully!` });
    });    
};

module.exports = Comment;