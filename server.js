const app = require("./App")
const dotenv = require("dotenv")
const userRoutes = require("./Routes/userRoutes")
const adminRoute = require("./Routes/adminRouts")
const roleRoute = require("./Routes/RoleRoutes")
const dataBaseConnection = require("./Config/mongodbConnection")

dotenv.config({path:"./Config/config.env"})
dataBaseConnection()
app.use("/api/v1/", userRoutes)
app.use("/api/v1/", adminRoute)
app.use("/api/v1/", roleRoute)


app.use((err,req,res,next)=>{
    res.send(err.message)
})

app.listen(process.env.port, ()=>{
    console.log(`server is running on port ${process.env.port}`);
    
})