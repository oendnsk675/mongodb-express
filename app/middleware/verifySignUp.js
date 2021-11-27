// this is authorization for signup user

const db = require("@models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email : req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return 
        }

        if(user) {
            res.status(400).send({
                message: `Failed! email is already.`
            })
        }

        next()
        
    })
}

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! ${req.body.roles[i]} doesn't exist!`
                })
                return 
            }   
        }
        next()
    }
}

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted,
}

module.exports = verifySignUp