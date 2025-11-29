import React, { useEffect, useState, useCallback } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import Textarea from "./Textarea";
import axios from "axios";
import Table from "./Table";

const ReviewProduct = ({ product, session }) => {
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [reviews, setReviews] = useState([]);
  const starCount = [1, 2, 3, 4, 5];

  const handleClick = (starNumber) => setStars(starNumber);

  // load reviews function (memoized)
  const loadReview = useCallback(async () => {
    try {
      const res = await axios.get(`/api/reviews?product=${product._id}`);
      setReviews(res.data);

      if (session) {
        const result = res.data.find(item => item.userEmail === session.user.email);

        console.log(result);

      }


    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  }, [product._id]);

  async function submitReview() {
    if (!session) {
      alert("You must login first");
      return;
    }

    try {
      await axios.post("/api/reviews", {
        description,
        date,
        stars,
        product: product._id,
      });
      setStars(0);
      setDate(new Date());
      setDescription("");
      loadReview();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }

  useEffect(() => {
    loadReview();
  }, [loadReview]); // ✅ no warning anymore

  const ratings = reviews.map((r) => r.stars);
  const totalRating = ratings.reduce((acc, val) => acc + val, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  const getLimitReviews = reviews

  return (
    <ProductReview>
      {/* Overall review section */}
      <OverallReview>
        <h1 className="text-3xl mt-10 text-center">
          Customer reviews & ratings
        </h1>
        <TotalReview>
          <h1 className="text-5xl font-bold mt-10 text-center text-gray-900">
            {averageRating.toFixed(1)}
          </h1>
          <AllStar>
            {starCount.map((star) => (
              <span key={star}>
                {averageRating >= star ? (
                  <AiFillStar color="#fbc531" />
                ) : (
                  <AiOutlineStar />
                )}
              </span>
            ))}
          </AllStar>
          <p>{reviews.length} ratings</p>
        </TotalReview>

        {/* Review list */}
        <div className="h-96 overflow-auto pr-10">
          <Table>
            <thead>
              <tr>
                <th>Showing reviews</th>
              </tr>
            </thead>
            <tbody className="">
              {getLimitReviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    <div className="flex justify-between">
                      <div className="text-lg">
                        <div className="flex">
                          {starCount.map((star) => (
                            <span key={star} className="flex">
                              {review.stars >= star ? (
                                <AiFillStar color="#2f3640" />
                              ) : (
                                <AiOutlineStar />
                              )}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400">
                          {review.userName || "Anonymous"}
                        </p>
                      </div>
                      <h1 className="text-md text-gray-400 font-bold">
                        {review.date
                          ? new Date(review.date).toLocaleDateString("sv-SE")
                          : ""}
                      </h1>
                    </div>
                    <p className="mt-2">{review.description}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </OverallReview>

      {/* Review submission */}
      <ReviewSubmit>
        <h1 className="text-3xl mt-10 text-center">Write your review</h1>
        <ReviewWrapper>
          <h1>Overall Rating</h1>
          <StarWrapper>
            {starCount.map((star) => (
              <button key={star} onClick={() => handleClick(star)}>
                {stars >= star ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            ))}
          </StarWrapper>
        </ReviewWrapper>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          role="textbox"
          placeholder="Your review"
        />
        <ButtonSubmit onClick={submitReview}>Submit your review</ButtonSubmit>
      </ReviewSubmit>
    </ProductReview>
  );
};

export default ReviewProduct;

/* ---------------- STYLES ---------------- */

const AllStar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: #808080;
  font-size: 18px;
`;

const TotalReview = styled.div`
  p {
    text-align: center;
    margin-top: 5px;
  }
`;

const ProductReview = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ReviewSubmit = styled.div`
  width: 100%;
`;

const OverallReview = styled.div``;

const ButtonSubmit = styled.button`
  display: block;
  margin: 20px auto;
  cursor: pointer;
  width: 100%;
  background-color: red;
  color: white;
  border-radius: 18px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: darkred;
  }
`;

const ReviewWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
  justify-content: center;
`;

const StarWrapper = styled.div`
  display: flex;
  font-size: 34px;
  color: #fbc531;
`;
