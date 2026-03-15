import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kanjarrbacche_db_user:resume123@cluster0.rhdoiiw.mongodb.net/RESUME')
    .then(() => console.log('DB CONNECTED'))
}