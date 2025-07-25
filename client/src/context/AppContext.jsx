import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';                                               
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [isSeller, setIsSeller] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([])

  const [cartItems, setCartItems] = useState({})
  const [searchQuery, setSearchQuery] = useState({})


  // Fetch User Auth , User Data and Cart Items

  const fetchUser = async () => {
    try {
      const {data} = await axios.get("/api/user/is-auth");
      if(data.success){
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error) {
      setUser(null);
    }
  }


  // Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const {data} = await axios.get("/api/seller/is-auth");
      if(data.success){
        setIsSeller(true);
      }else{
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  }


// Fetch All Products
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get("/api/product/list");
      if(data.success){
        setProducts(data.products);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
    

  // Add Product to Cart
 const addToCart = (itemId) => {
  let cartData = structuredClone(cartItems); 
  if(cartData[itemId]){
    cartData[itemId] += 1;
  }else{
    cartData[itemId] = 1;
  }
  setCartItems(cartData);
  toast.success("Added to Cart")
 }

// Update Cart Item Quantity

 const updateCartItem = (itemId, quantity) => {
   let cartData = structuredClone(cartItems);
   cartData[itemId] = quantity;
   setCartItems(cartData)
   toast.success("Cart Updated")
 }

 // Remove Porduct form Cart 

 const removeFromCart = (itemId) => {
  let cartData = structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId] -= 1;
    if(cartData[itemId] === 0){
      delete cartData[itemId];
    }
  }
  toast.success("Remove form Cart")
  setCartItems(cartData)
 }

 // Get Cart Item Count
 const getCartCount = () => {
  let totalCount = 0;
  for(const item in cartItems){
    totalCount += cartItems[item]
  }
  return totalCount;
 }

// Get Cart Total Amount
 const getCartAmount = ()=> {
   let totalAmount = 0;
   for(const itemId in cartItems){
    let itemInfo = products.find((product)=> product._id === itemId);
    if(itemInfo  && cartItems[itemId] > 0){
      totalAmount += itemInfo.offerPrice * cartItems[itemId]
    }
   }
   return Math.floor(totalAmount * 100) / 100;
 }


  // Fetch user, seller, and products on mount
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);


// Update Database Cart Items
  useEffect(()=>{
    const updateCart = async () => {
      try {
        const {data} = await axios.post("/api/cart/update", {cartItems});
        if(!data.success){
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    if(user){
      updateCart();
    }
  },[cartItems])

  useEffect(() => {
  if (!products.length) return;
  const validProductIds = products.map((p) => p._id);
  let updatedCart = { ...cartItems };
  let changed = false;
  for (const key in cartItems) {
    if (!validProductIds.includes(key)) {
      delete updatedCart[key];
      changed = true;
    }
  }
  if (changed) {
    setCartItems(updatedCart);
    toast.error("Some products in your cart were removed because they are no longer available.");
  }
}, [products]);


  const value = {navigate, user, setUser, 
    setIsSeller, isSeller,showUserLogin, 
    setShowUserLogin, products, currency, 
    addToCart, updateCartItem, removeFromCart,
    cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems }
  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}