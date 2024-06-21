const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema ({
    user:{
        type : mongoose.Schema.Types.ObjectId,    //linking the respective user to his notes
        ref : 'user',
    },
    title:{
        type : String,
        require : true,
    },
    tag:{
        type : String,
        deafult : 'general'
    },
    timeStamp:{
        type : Date,
        default : Date.now
    },

})

const todoModel = mongoose.model('todolists', todoSchema);
module.exports = todoModel;