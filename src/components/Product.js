import React from "react";
import "../css/Product.css";
import { useStateValue } from "./StateProvider";

function Product(props) {
  let id, title, image, price, rating;
  try {
    id = props.state.products[props.num]._id;
    title = props.state.products[props.num].title;
    image = props.state.products[props.num].image;
    price = props.state.products[props.num].price;
    rating = props.rate;
  } catch (err) {
    id = null;
    title = null;
    image = null;
    price = null;
    rating = null;
  }

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <>
      {id === null ? (
        <></>
      ) : (
        <div key={id} className="product">
          <div className="product_info">
            <p>{title}</p>
            <div className="product_price">
              <small>$</small>
              <strong>{price}</strong>
              <div className="product_rating">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <p key={i}>⭐</p>
                  ))}
              </div>
            </div>
          </div>
          <img src={image} alt="Book" />

          <button onClick={addToBasket} className="btn-add-basket">
            Add to Basket{" "}
          </button>
        </div>
      )}
    </>
  );
}

export default Product;
