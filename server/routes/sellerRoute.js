import express from 'express'
import { isSellerAuth, sellerLogout } from '../controllers/sellerController'
import authSeller from '../middlewares/authSeller'


    const sellerRouter = express.Router()   

    sellerRouter.post('/login' , sellerLogin)
    sellerRouter.get('/is-auth' , authSeller ,  isSellerAuth)
    sellerRouter.get('/logout' , authSeller ,  sellerLogout)

 export default sellerRouter