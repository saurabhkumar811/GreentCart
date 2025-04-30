import Product from "../models/product"
import { v2 as cloudinary} from cloudinary


// add product   /api/product/add
export const addProduct = async ( req,res)=>{

    try {
        
       let productData  = JSON.parse(req.body.productData)

       const images =  req.file

       let imagesUrl = await Promise.all(

        images.map(async (item)=>{
            let result  = await  cloudinary.uploader.upload(item.path,{resource_type :'image'})
            return  result.secure_url
        })
       )

       await  Product.create({...productData , image : imagesUrl})

       res.json({success : true ,  message :  error.message})

    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message })
    }
}

// get product   /api/product/list

export const productList = async (req,res)=>{

    try {
        
       await Product.find({})
       res.json({success : true ,  products})


    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message })
    }

}

// get single product   /api/product/id

export const productById = async (req,res)=>{

    try {
    const { id } = req.body        
    const product  = Product.findById(req.id)

      return res.json({success : true , product})


    } catch (error) {
       
            console.log(error.message)
            res.json({success : false , message : error.message })
    }
}

// change product instock   /api/product/stock

export const changeStock = async (req,res)=>{

    try {
    const { id  , inStock} = req.body        
    const product  = Product.findByIdAndUpdate(req.id , {inStock})

      return res.json({success : true , message : "Stock Updated"})

    } catch (error) {
            console.log(error.message)
            res.json({success : false , message : error.message })
        
    }

}
