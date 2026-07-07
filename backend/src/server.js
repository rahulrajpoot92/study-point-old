import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
try{
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}catch(error){
    console.log("Server failed to start", error.message);
}

};

startServer();


