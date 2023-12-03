import express, {urlencoded} from "express";
import morgan from "morgan";
import http from 'http'
import cors from 'cors'
import helmet from "helmet";
import { HttpStatus } from "./config/httpStatus.js";
import { errorHandler } from "./middleware/errorHandling.js";
import connectDB from "./databse/connection.js";
import AppError from "./utils/appError.js";
import { configkeys } from "./config/configkeys.js";
import  router  from "./router/index.js";

//create express
const app =express()

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

//connection DB
connectDB()

app.use(router)

app.all("*",(req,res,next)=>{
const err= new AppError(`Can't find ${req.originalUrl}on server`,HttpStatus.NOT_FOUND)
next(err)
})

//global error

 app.use(errorHandler)

// creating server

const port=configkeys.PORT || 8080
const server =http.createServer(app)

server.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})