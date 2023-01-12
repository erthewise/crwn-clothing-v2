import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({checkoutItem}) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const { removeItem, incrementItem, decrementItem } = useContext(CartContext);

  const deleteItem = () => removeItem(checkoutItem);
  const addItem = () => incrementItem(checkoutItem);
  const reduceItem = () => decrementItem(checkoutItem);
  
  return (
    <div>
      <img src={`${imageUrl}`} alt={`${name}`}/>
      <span>{name}</span>
      <div>
        <button type="button" onClick={reduceItem}>-</button>
        <span>{quantity}</span>
        <button type="button" onClick={addItem}>+</button>
      </div>
      <span>{price}</span>
      <button type="button" onClick={deleteItem}>x</button>
    </div>
  )
}

export default CheckoutItem;