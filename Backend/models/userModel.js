//mongoDB
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const db_link="mongodb://127.0.0.1:27017/food";
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log('user db connected');
})
.catch(function(err){
  console.log(err);
});

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate:function(){
      return emailValidator.validate(this.email);
    }
  },
  password:{
    type:String,
    required:true,
    minLength:8
  },
  confirmPassword:{
    type:String,
    required:true,
    minLength:8,
    validate:function(){
      return this.confirmPassword==this.password
    }
  }
});


// userSchema.pre('save',function(){
//   this.confirmPassword=undefined;
// });

// model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;