require('module-alias/register')
const models =  require('@models/')
const config = require("@configs/auth.config")
let bcrypt = require('bcryptjs')
const User =  models.user
const Role =  models.role
const jwt  = require('jsonwebtoken')

module.exports = {
    async register(req, res) {
        const user = new User({
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 8),
            name : req.body.name
        })

        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (req.body.roles) {
                Role.find({
                    name: { $in: req.body.roles}
                }, (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map( role => role._id)
                    user.save( err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.status(200).send({
                            message: "User was registered successfully!",
                            data: user
                        })
                    })
                })
            }
        })
    },
    async login(req, res) {
        await User.findOne({
            email: req.body.email
        }).populate("roles", "-__v")
          .exec( (err, user) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    })
                    return
                }

                if (!user) {
                    res.status(404).send({
                        message: "User not found"
                    })
                }

                let passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password,
                )

                if (!passwordIsValid) {
                    res.status(401).send({
                        message: "Invalid password",
                        accessToken: null
                    })
                }

                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 //24 hours
                })

                let authorities = []

                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
                }

                res.status(200).send({
                    id: user._id,
                    name: user.name,
                    roles: authorities,
                    accessToken: token,
                })
          })
    },

    async findAllUser () {
        User.find().exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                })
            }

            res.status(200).send({
                message: "success get data user",
                data: user
            })
        })
    }
}