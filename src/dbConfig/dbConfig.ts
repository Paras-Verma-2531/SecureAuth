import mongoose from "mongoose";
export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("database connected successfully");
    });
  } catch (error) {
    console.log("MONGODB ERROR: ", error);
    process.exit(1);
  }
}
