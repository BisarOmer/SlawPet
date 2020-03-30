const sql = require("../Config/config");

const Comment = function (comment) {
    this.account_id = comment.account_id;
    this.adoption_id = comment.adoption_id;
    this.content = comment.content;
    this.date = Date.now();
};

Comment.postComment = (comment, result) => {
    sql.query("INSERT INTO comment SET ?", comment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...comment });
    });
};

Comment.commentByAdobtion = (adobtion_id, result) => {
    sql.query("SELECT comment.`adoption_id`,comment.`comment_id`,comment.`content`, user.name ,user.profile from user INNER JOIN comment on user.account_id=comment.account_id where comment.`adoption_id`=?", adobtion_id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
    });
};

Comment.deleteComment=(commentid,result)=>{
    sql.query("delete from  comment where comment_id = ?", commentid, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result({ message: `comment was deleted successfully!` });
    });
};




module.exports = Comment;