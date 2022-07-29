import mongoose from "mongoose";
import config from "config";

async function connect(): Promise<void> {
  const dbUri = config.get<string>("mongo_uri");
  try {
    await mongoose.connect(dbUri);
    console.log('connected to MongoDb');
  } catch (e) {
    process.exit(1);
  }
}

export default connect;