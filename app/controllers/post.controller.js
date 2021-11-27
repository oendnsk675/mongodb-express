require('module-alias/register')
const models =  require('@models/')
const Post =  models.posts

function createSlug(parse){
    let text = parse.toLowerCase()
    return text.replace(/\s+$/, '').replace(/ /g, "-")
}

exports.findAllPost = (req, res) => {
    Post.find().then(result => {
        res.json(result)
    }).catch(err => {
        res.status(409).send({
            message : "Error while retrieve post"
        })
    })
}
exports.detailPost = (req, res) => {
    Post.find({slug : req.params.slug}, (err, post) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return 
        }

        if(!post) {
            res.status(404).send({
                message: "Post Not found"
            })
            return 
        }

        res.status(200).send({
            message: "success get detail post",
            data: post
        })
    })

}
exports.create = (req, res) => {
        console.log(req.body.title);
        const post = new Post({
            title: req.body.title,
            slug: createSlug(req.body.title),
            body: req.body.body,
            published: req.body.published ? req.body.published : false 
        })
        post.save(post)
        .then(result => {
            res.send({
                message: "success create post",
                data: result
            })
        }).catch(err =>{
            res.status(409).send({
                message : "Error while create post"
            })
        })
}
exports.update = (req, res) => {
        const id = req.params.id 
        Post.findByIdAndUpdate(id, req.body)
        .then(result => {
            if (!result) {
                res.status(404).send({
                    message : "Post not found"
                })
            }
            res.send({
                message : "Pust was updated "
            })
        }).catch(err =>{
            res.status(409).send({
                message : "Error while update post"
            })  
        })
}