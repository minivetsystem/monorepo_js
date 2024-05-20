export default () => ({
  mongoURL: process.env.MONGODB_URI,
  encryptionKey: process.env.ENCRYPT_SECRET,
  jwtSecret: process.env.JWT_SECRET
});
