import dotenv from 'dotenv'
dotenv.config()
export const configkeys={
  DB_NAME: process.env.DB_NAME,
  MONGODB_URL:process.env.MONGODB_URL,
  PORT:process.env.PORT
}