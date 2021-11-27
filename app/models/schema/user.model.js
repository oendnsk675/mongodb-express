module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        email: String,
        password: String,
        name: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "roles"
            }
        ]
    },
    {timestamps:true}
    )

    const User = mongoose.model('users', schema)
    return User
}