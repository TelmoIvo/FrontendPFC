module.exports = function (mongoose) {
    var historico = new mongoose.Schema(
        {
            vid: {type: Number},
            tmx: {type: Date},
            'comments': {type: Array},
            'anomalia': {type: String},
            color: {type: String}
        },
        {collection: 'historico'});


    var User = mongoose.model('historico', historico);

    //put custom methods here

    return {
        User: User
    }
}