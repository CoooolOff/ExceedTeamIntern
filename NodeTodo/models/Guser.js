const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type:String, required: true, unique: true},
    todos: [{type: Types.ObjectId, ref: 'Todo'}]
})


module.exports = model('Guser', schema)