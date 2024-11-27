const mongoose = require("mongoose")

const dataBaseConnection = ()=>{
    mongoose.connect(process.env.Mongodb_Url)
    .then((data)=>console.log(data.connection.host)
    )
    .catch((err)=>console.log(err.message)
    )
}

module.exports = dataBaseConnection