const { default: mongoose } = require("mongoose")

const ConnectDb = async() =>{
   try {
    await mongoose.connect("mongodb+srv://krutilborad2020:Krutil1230@cluster0.zqtlcs5.mongodb.net/")
    console.log("ConnectDb");
   } catch (error) {
    console.log(error);
   }
}

module.exports = ConnectDb;
