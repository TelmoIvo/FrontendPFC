/*
 * user module
 */

/**
 * This method read records
 *
 * @param req
 * @param res
 */
exports.read = function (req, res) {
    var params = req.body;

    exports.model.User.find({'Anom':1,'color':{$ne : 'Green'}}, function (err, rec) {
        res.send({success: true, User: rec});
    });
};

/**
 * This method update records
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
    var params = req.body, id = params._id;

    //remove id from values to update
    delete params._id;

    exports.model.User.update({"_id": id},{ $set : params}, {upsert:false}, function (err) {
        if(!err) {
            res.send({success: true});
        }
        else {
            res.send({success: false});
        }
    });
};

/**
 * This method remove records
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
    var params = req.body;

    exports.model.User.remove({"_id": params._id}, function (err) {
        if(!err) {
            res.send({success: true});
        }
        else {
            res.send({success: false});
        }
    });
};