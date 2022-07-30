import "../src/utils/dotenv.utils";

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  smtp: {
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure: false
  }
};
