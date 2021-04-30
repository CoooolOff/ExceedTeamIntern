const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    title: {type: String},
    checked: false,
    color: {type: String}
})


module.exports = model('Todo', schema)