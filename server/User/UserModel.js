// const { default: mongoose } = require("mongoose");

// class UserModel{
//     constructor(){
//         this.schema = new mongoose.Schema({
//             firstName:{type:String, required:true},
//             lastName:{type:String, required:true},
//             phone:{type:String , default:null},
//             password:{type:String, required:true},
//             email:{type:String, required:true, unique:true},

//         },{
//             timestamps:true
//         })

//         this.tbl_user = mongoose.model("tbl_users", this.schema)
//     }

//     addUser(userInfo){
//         return this.tbl_user.create(userInfo)
//     }
// }

// const userModel = new UserModel()
// module.exports = userModel



const { default: mongoose } = require("mongoose");

class UserModel{
    constructor(){
        this.schema = new mongoose.Schema({
            firstName:{type:String, required:true},
            lastName:{type:String, required:true},
            email:{type:String, required:true, unique:true},
            phone:{type:String, default:null},
            password:{type:String, required:true},
            isAdmin:{type:Boolean, default:false}
        },{
            timestamps:true
        })
    }
}


const User =new UserModel()
const userModel = mongoose.model("tbl_user", User.schema)
module.exports = userModel