import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ProductCard({ id, productId, name, price, size, image }) {
  const [data, setData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const { linkUrl } = useParams();
  const { isAuth } = useSelector((state) => state.auth);

  // add to cart
  const addToCart = async () => {
    try {
      const request = await axios.post("http://localhost:5000/carts", {
        productId: id,
      });
      setData(request.data);
      console.log("added to cart");
    } catch (error) {
      console.log(error.message);
    }
  };

  // post favorites
  const postFavorites = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/favorites/productId/${id}`
      );
      if (response.data) {
        console.log("Data already exists in the database, cannot submit");
        return;
      }
      await axios.post("http://localhost:5000/favorites", {
        productId: id,
      });
      setIsFavorited(response.data);
      console.log("favorite posted");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Link to={`/content/${linkUrl}/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>{name}</div>
      <div>{size}</div>
      <div>{price}</div>
      {isAuth ? (
        <div>
          <button onClick={addToCart}>Add to Cart</button>
          <div onClick={postFavorites}>
            <FavoriteIcon />
          </div>
        </div>
      ) : (
        <div className="please-login">
          <Link color="black" to="/account">
            {" "}
            Log In{" "}
          </Link>
          or
          <Link color="black" to="/account">
            {" "}
            Create an Account{" "}
          </Link>
          to add to favorites and cart
        </div>
      )}
    </div>
  );
}

export default ProductCard;
