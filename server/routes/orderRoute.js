import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/orderConroller"
import express from 'express'
import authUser from "../middlewares/authUser"
import authSeller from "../middlewares/authSeller"

const  orderRouter =  express.Router()

orderRouter.post('/cod', authUser,  placeOrderCOD)
orderRouter.post('/user', authUser,  getUserOrders)
orderRouter.post('/seller', authUser,  getAllOrders)

export default  orderRouter 