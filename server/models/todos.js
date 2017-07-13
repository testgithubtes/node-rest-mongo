var mongoose = require('mongoose');

var Todos = mongoose.model('todo',{
  text :{
    type : String,
    required : true,
    minlength : 1,
    trim : true
  },
  completed :{
    type : Boolean
  },
  completedAt :{
    type : Number
  }
});

module.exports ={Todos};
