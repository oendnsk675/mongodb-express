require('module-alias/register')
const userController = require('@controllers/userController/auth/')
const { verifySignUp, authJwt } = require("@middleware")


module.exports = (express, app) => {
    const router = require('express').Router()

    router.post('/register', 
                [
                    verifySignUp.checkDuplicateEmail,
                    verifySignUp.checkRolesExisted
                ] , userController.register)
    router.post('/login', userController.login)
    router.post('/user', [ authJwt.verifyToken, authJwt.isAdmin ], userController.findAllUser) // must be admin

    app.use('/api/', router)
}