import express from 'express'
import { updateCart } from "../controllers/cartController"


const cartRouter = express.Router()

cartRouter.post('/update' , updateCart)

export default cartRouter 