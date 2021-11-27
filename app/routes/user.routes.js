require('module-alias/register')
const userController = require('@controllers/userController/auth/')  // user controller
const { verifySignUp } = require("@middleware")

module.exports = (express, app) => {
    const router = require('express').Router()

    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //       );
    //       next();
    // })

    router.post('/register', 
                [
                    verifySignUp.checkDuplicateEmail,
                    verifySignUp.checkRolesExisted
                ] , userController.register)
    router.post('/login', userController.login)
    router.post('/user', userController.findAllUser) // must be admin

    app.use('/api/', router)
}