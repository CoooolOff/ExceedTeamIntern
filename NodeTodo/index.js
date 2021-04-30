const express  = require('express')
const mongoose = require('mongoose')
const app      = express()
const PORT     = 5000

app.use(express.json({extended: true}))
app.use('/api/auth/', require('./routes/auth.route'))
app.use('/api/todo/', require('./routes/todo.route'))


async function start(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/toDoDb',{
               useNewUrlParser: true,
            useUnifiedTopology: true,
                useCreateIndex: true,
              useFindAndModify: true
        })

        app.listen(PORT,() =>{
            console.log(`Server started on port ${PORT}`)
        })
    }catch (err){
        console.log(err)
    }
}

start()
