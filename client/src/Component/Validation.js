function Validation(data, type){
    let errors = []
    if(type === "login"){
        if (!data.email) {
            errors.push({ key: "email", message: "Requied Field Email is Empty" })
        } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email))) {
            errors.push({ key: "email", message: "Please Enter a Valid Email" })
        }

        if (!data.password) {
            errors.push({ key: "password", message: "Requied Field Password is Empty" })
        } else if (!(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))) {
            errors.push({ key: "password", message: "Password is to Low, Please Enter a Strong Password" })
        }

        return errors
    }
    else if (type === "register") {
        if (!data.firstName) {
            errors.push({ key: "firstName", message: "Requied Field Firstname is Empty" })
        } else if (data.firstName.length < 3 || (!/^[A-Za-z]+$/.test(data.firstName))) {
            errors.push({ key: "firstName", message: "Please Checke Your FirstName" })
        }

        if (!data.lastName) {
            errors.push({ key: "lastName", message: "Requied Field LastName is Empty" })
        } else if (data.lastName.length < 3 || (!/^[A-Za-z]+$/.test(data.lastName))) {
            errors.push({ key: "lastName", message: "Please Checke Your lastName" })
        }
        if (!data.email) {
            errors.push({ key: "email", message: "Requied Field Email is Empty" })
        } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email))) {
            errors.push({ key: "email", message: "Please Enter a Valid Email" })
        }

        if (!data.password) {
            errors.push({ key: "password", message: "Requied Field Password is Empty" })
        } else if (!(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))) {
            errors.push({ key: "password", message: "Password is to Low, Please Enter a Strong Password" })
        }
        return errors
    }
}

module.exports = Validation