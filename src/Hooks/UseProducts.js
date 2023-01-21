import { useEffect, useState } from "react";

const useProducts = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://ford-server.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return [product];
};

export default useProducts;
