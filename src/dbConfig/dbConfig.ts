import mongoose from "mongoose";
export async function connect() {
  try {
    //! states that something is always available in our case it is :: MONGO_URI
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("database connected successfully");
    });
    connection.on("error",(err)=>
    {
      console.log("MongoDB connection error. Please mke sure MongoDB is running. "+err);
    })
  } catch (error) {
    console.log("MONGODB ERROR: ", error);
    process.exit(1);
  }
}
