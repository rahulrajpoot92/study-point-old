import mongoose from "mongoose";
import dns from "node:dns/promises";
console.log(await dns.getServers());
dns.setServers(["1.1.1.1"]);
// [ '127.0.0.53' ]
const connectDB = async () => {
    try{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB connected: ${conn.connection.host}`);
    console.log('Connected to DB:', mongoose.connection.name);
    }catch(error){
    console.error("MONGODB connection failed:", error.message);
    process.exit(1);
    }
};

export default connectDB;