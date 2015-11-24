/**
 * It's only static background,
 * in real world everything goes automatically
 *
 * @param app
 * @param models
 */
exports.init = function(app, models)
{
    var index = require('./controller');
    var user = require('./controller/user');

    /* set models */
    user.model = models.User;

    /* set controllers */
    app.get('/', index.index);

    //read
    app.get('/users', user.read);
    //update
    app.put('/users', user.update);
}