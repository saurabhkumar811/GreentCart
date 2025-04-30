import Address from "../models/address"


//add addrss   /api/address/add
export const addAddress = async (req,res)=>{
     
    try {
        const { address , userId} = req.body

        Address.create({...address , userId})
        res.json({success: true , message : "Address Added Successfully"})

    } catch (error) {
         console.log(error.message)
        res.json({success : false  , message : error.message})
    }
}

// get   /api/address/get

export const getAddress = async (req,res)=>{

    try {
        
        const { userId } = req.body

        const address = Address.findById({userId})
        res.json({success  :true , address})

    } catch (error) {
        console.log(error.message)
        res.json({success : false  , message : error.message})
    }

}


