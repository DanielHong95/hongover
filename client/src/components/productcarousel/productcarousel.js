import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../productcarousel/productcarousel.css";

function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const carouselInfiniteScroll = () => {
    if (currentIndex === products.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  // get products
  useEffect(() => {
    async function fetchProducts() {
      const getProducts = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/`
      );
      setProducts(getProducts.data);
    }
    // console.log(products);
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      carouselInfiniteScroll();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="carousel-container">
      {products.map(({ id, name, category, image_url }, index) => {
        return (
          <h1
            className="card"
            style={{ transform: `translate(-${currentIndex * 100}%)` }}
            key={index}
          >
            <div className="image">
              <Link to={`/content/${category}/${id}`}>
                <img src={image_url} alt="" width="250" height="250" />
              </Link>
            </div>
            <div className="name">{name}</div>
          </h1>
        );
      })}
    </div>
  );
}

export default ProductCarousel;
