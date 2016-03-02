module.exports = function (app) {
    require('./todo')(app);
    require('./category')(app);
};