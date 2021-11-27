module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        "title": String,
        "slug": String,
        "body": String,
        "published": Boolean,
    },
    {timestamps:true}
    )

    const Post = mongoose.model('posts', schema)
    return Post
}