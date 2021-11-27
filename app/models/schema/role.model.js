module.exports =  (mongoose) => {
    const schema = mongoose.Schema({
        name : String
    })

    const Role = mongoose.model('roles', schema)
    return Role
}