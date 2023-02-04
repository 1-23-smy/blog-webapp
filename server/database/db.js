import mongoose from "mongoose";
const Connection = async(username,password) => {
    const URL = `mongodb+srv://${username}:${password}@blog.q2c5ejo.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(URL, { useNewUrlParser:true });
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Error while connecting",err);
    }
}
export default Connection;