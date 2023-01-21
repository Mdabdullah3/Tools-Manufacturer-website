import { useEffect, useState } from "react";

const UseReview = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch("https://ford-server.onrender.com/review")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [review]);
  return [review];
};

export default UseReview;
