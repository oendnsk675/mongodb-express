require('module-alias/register')
const dbConfig = require('@configs/db.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

// schema collection
db.posts = require('./schema/post.model')(mongoose)
db.user = require('./schema/user.model')(mongoose)
db.role = require('./schema/role.model')(mongoose)

db.ROLES = ['user', 'admin']

module.exports = db