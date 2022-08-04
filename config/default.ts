import "../src/utils/dotenv.utils";

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  accessTokenPrivateKey: process.env.ACCESS_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
  smtp: {
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure: false
  }
};
