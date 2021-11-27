require('module-alias/register')
const postController = require('@controllers/post.controller')
const { authJwt } = require("@middleware")

module.exports = (express, app) => {
    const router = express.Router()
    router.get('/', postController.findAllPost) // public
    router.get('/:slug', [ authJwt.verifyToken, authJwt.isUser ], postController.detailPost) // must be user
    router.post('/', [ authJwt.verifyToken, authJwt.isAdmin ], postController.create) // must be admin
    router.put('/:slug', [ authJwt.verifyToken, authJwt.isAdmin ], postController.update) // must be admin

    app.use('/api/posts/', router)
}