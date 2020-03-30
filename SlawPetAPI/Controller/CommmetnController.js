const CommentModel = require("../Model/CommentModel");

exports.postComment = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const comment = new CommentModel({
        account_id: req.decoded.id,
        adoption_id: req.body.Adoption_id,
        content: req.body.content
    });

    CommentModel.postComment(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while posting the commetn."
            });
        else res.send(data);
    });
};


exports.getCommentByAdoption = (req, res) => {
    CommentModel.commentByAdobtion(req.params.adoption_id, (err, data) => {
        if (err) {
            console.log("error: ", err)
        }
        else {
            res.send(data)
        }
    });
};


exports.deleteComment = (req, res) => {
    CommentModel.deleteComment(req.params.comment_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.comment_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.comment_id
                });
            }
        }
        else
            res.send({ message: `Customer was deleted successfully!` })

    });
};