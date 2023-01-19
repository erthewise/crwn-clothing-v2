import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, } from "react-router-dom";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from "./store/user/userSlice";
import { calculateCartTotals } from "./store/cart/cartSlice";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import OrderSuccess from "./routes/order-success/order-success.component";

const App = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateCartTotals());
    //eslint-disable-next-line
  }, [cartItems]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='order_success' element={<OrderSuccess />} />
      </Route>
    </Routes>
  );
};

export default App;