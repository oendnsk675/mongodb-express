const express = require('express')
const cors = require('cors')
require('module-alias/register')

const app = express()

let corsOptions = {
    origin : "https://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))




// models
const db = require('@models/')
const Role = db.role
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(`cannot connect to the database`, err);
})

// router
require('@routes')(express, app)

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
})


// create role if still empty on database
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            // add user role to roles collection 
            new Role({
                name : 'user'
            }).save(err => {
                if (err) throw err
                console.log(`added 'user' to roles collection`);
            })
            
            // add admin role to roles collection 
            new Role({
                name : 'admin'
            }).save(err => {
                if (err) throw err
                console.log(`added 'admin' to roles collection`);
            })
        }
    })
}

initial()