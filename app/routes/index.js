require('module-alias/register')

module.exports = (express, app) => {
    require('@routes/post.routes.js')(express, app);
    require('@routes/user.routes.js')(express, app);
}