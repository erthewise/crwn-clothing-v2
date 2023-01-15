import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { 
  CheckoutItemContainer, 
  ImageContainer, 
  Arrow,
  RemoveButton 
} from './checkout-item.styles';

const CheckoutItem = ({checkoutItem}) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const { removeItem, addItemToCart, clearItemFromCart } = useContext(CartContext);

  const removeItemHandler = () => removeItem(checkoutItem);
  const addItemHandler = () => addItemToCart(checkoutItem);
  const clearItemHandler = () => clearItemFromCart(checkoutItem);
  
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={`${imageUrl}`} alt={`${name}`}/>
      </ImageContainer>
      <span className="name">{name}</span>
      <span className="quantity">
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <span className="value">{quantity}</span>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </span>
      <span className="price">{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;