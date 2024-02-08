// const bcrypt = require("bcrypt")
// const userModel = require("./UserModel")
// const jwt = require("jsonwebtoken")

// class UserController {
//     async userRegister(req, res) {
//         try {
//             const { userInfo } = req.body
//             userInfo.password = bcrypt.hashSync(userInfo.password, 8)
//             let result = await userModel.addUser(userInfo)
//             if (result || result.password) {
//                 result = result._doc
//             }
//             delete result.password
//             const token = jwt.sign(result, process.env.JWT_SECRET )
//             if (!token) return res.status(500).send({ message: "Somthing went wrong" })
//             return res.status(200).send({message:"Success", token:token})
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send({ message: "Internal server error" })
//         }
//     }

// }

// const userController = new UserController
// module.exports = userController



const userModel = require("./UserModel")
const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")
const Validation = require("./Validation")


class UserController {
    // async InsertUser(req, res) {
    //     try {

    //         const password = bcrypt.hashSync(req.body.password, 8)

    //         if (!password) {
    //             return res.status(500).send({ message: "Somthing Went Wrong" })
    //         }

    //         const result = await userModel.create({ ...req.body, password: password })
    //         if (result) {
    //             return res.status(200).send({ message: "success", user: result })
    //         }
    //         return res.status(500).send({ message: "Somthing Went Wrong" })
    //     } catch (error) {
    //         if (error && error.code && error.code === 11000) {
    //             return res.status(400).send({ message: "Email is Allready Exist" })
    //         }
    //         return res.status(500).send({ message: "Internal Server Error" })

    //     }
    // }

    async userLogin(req, res) {
        try {
            const { email, password } = req.body

            let validationResult =Validation(req.body,"login")

            if (validationResult.length > 0) {
                return res.status(400).send({message:"Validation error", errors:validationResult})
            }
            

            let result = await userModel.findOne({ email: email })

            if (!result) res.status(400).send({ message: "Validation Error" , errors:[{key:"password", message:"Email is Exist"}]})
             result = result._doc

            if (!bcrypt.compareSync(password, result.password)) {
                return res.status(400).send({ message: "Validation Error",errors:[{key:"password", message:"Password and Email are not Matched"}] })
            }

            delete result.password

            const token = Jwt.sign(result, process.env.JWT_SECRET, {
                expiresIn: "30d"
            })

            result = {
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email
            }

            if (!token)
                return res.status(500).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success", userinfo: result, token: token })


        } catch (error) {
            console.log(error);
        }
    }

    async userRegister(req, res) {
        try {
            const { password } = req.body


            let registervalidationResult =Validation(req.body,"register")

            if (registervalidationResult.length > 0) {
                return res.status(400).send({message:"Validation error", errors:registervalidationResult})
            }

            const enPassword = bcrypt.hashSync(password, 8)
            if (!enPassword) return res.status(500).send({ message: "Somthing went wrong" })
            req.body.password = enPassword
            let user = await userModel.create(req.body)
            if (!user) return res.status(500).send({ message: "Somthing went wrong" })
            user = user._doc
            delete user.password
            let token = Jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "30d"
            })
            if (!token) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success", userinfo: user, token: token })

        } catch (error) {
            console.log(error);
            if (error && error.code === 11000) {
                return res.status(400).send({message:"Validation error", errors:[{key:"email", message:"Email is Allready Exist!"}]})
            }
            return res.status(500).send({ message: "Internal Server error" })

        }
    }
}


const userController = new UserController()
module.exports = userController