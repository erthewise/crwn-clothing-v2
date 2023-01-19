import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetCart } from '../../store/cart/cartSlice'
import './order-success.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";

const OrderSuccess = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBackToShop = () => {
    dispatch(resetCart());
    navigate('/shop');
  }

  return (
    <div className="order-page-container">
      <h2>Order successful</h2>
      <span className="total">{`Paid Amount: $${totalAmount}`}</span>
      <p className="appreciation">"Thank you for simulating an order" - Tenshi</p>
      {cartItems.map((item) =>
        <div key={item.id} className="order-items-container">
          <div className="image-container">
            <img src={`${item.imageUrl}`} alt={`${item.name}`}/>
          </div>
          <span className="name">{item.name}</span>
          <span className="quantity">{item.quantity} pcs.</span>
          <span className="price">${item.price * item.quantity}</span>
        </div>
      )}
      <Button className="back-button" onClick={goBackToShop}>Go Back</Button>
    </div>
  )
}

export default OrderSuccess;