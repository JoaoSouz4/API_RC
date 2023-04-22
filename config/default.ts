require('dotenv').config();

export default {
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
}