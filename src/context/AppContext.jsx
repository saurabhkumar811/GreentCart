import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import  {toast}  from 'react-hot-toast'
export const AppContext = createContext()

export const AppContextProvider = ({children})=>{

    const currency = import.meta.VITE_CURRENCY

    console.log(currency)
  
    const navigate = useNavigate()
    const [user,setUser] = useState(false)
    const [isSeller , setIsSeller] = useState(false)
    const [showUserLogin , setShowUserLogin] = useState(false)
    const [products , setProducts] = useState([])
    const [ cartItems , setCartItems] = useState({})
    const [ searchQuery , setSearchQuery] = useState({})

      // fetch products
    const fetchProducts = ()=>{
        setProducts(dummyProducts)
    }

    useEffect(() => { 
      fetchProducts()
    }, [])
    
    // add items to cart
    const addToCart = (itemId)=>{
      const cartData = structuredClone(cartItems)

      if(cartData[itemId])
        cartData[itemId] += 1
      else
       cartData[itemId] = 1 

       setCartItems(cartData)
       toast.success("Added to Cart")

    }

    // update cart item 
    const updateCartItem = (itemId , quantity)=>{
         const cartData = structuredClone(cartItems)

         cartData[itemId] = quantity
         setCartItems(cartData)
         toast.success("Cart Updated")
    }

    // remove cart item 
    const removeCartItem = (itemId)=>{
        const cartData = structuredClone(cartItems)

        if(cartData[itemId]) 
        {
          cartData[itemId] -= 1 ;

          if(cartData[itemId] == 0)
           delete cartData[itemId]
          }

          setCartItems(cartData)
          toast.success("Removed from Cart")
    }

    const getCartCount =()=>{
       let totalCount = 0

       for( const itemId in cartItems)
       {
         totalCount += cartItems[itemId]
       }

       return totalCount
    }

  const getCartAmount = ()=>{
     let totalAmount = 0 

     for ( const itemId in cartItems )
     {
        const item = products.find((product)=> product._id == itemId)

       if( cartItems[itemId] >0)
        totalAmount += item.offerPrice * cartItems[itemId]

     }

     return totalAmount

  }



    const value = {navigate,user,setUser,isSeller,setIsSeller , showUserLogin , setShowUserLogin , products , cartItems ,
       addToCart , updateCartItem , removeCartItem , searchQuery , setSearchQuery , currency , getCartAmount , getCartCount
    }

  return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext= ()=>{
    return useContext(AppContext)
}