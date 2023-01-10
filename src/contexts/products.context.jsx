import { createContext, useState, } from "react";
// import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProduct] = useState(PRODUCTS);
  const value = { products };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

