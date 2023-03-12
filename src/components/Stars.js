import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
  //console.log(stars, reviews);

  //direct array generation
  const starArr = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= index + 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  //function to generate array
  const generateStar = () => {
    let spanArr = [];
    for (let i = 0; i < 5; i++) {
      spanArr.push(
        <span key={i}>
          {stars >= i + 1 ? (
            <BsStarFill />
          ) : stars >= i + 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      );
    }
    return spanArr;
  };

  return (
    <Wrapper>
      <div className="stars">
        {
          starArr
          //generateStar()
        }
        {/* 
        //by hard coding
        <span>
          {stars >= 1 ? (
            <BsStarFill />
          ) : stars >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 2 ? (
            <BsStarFill />
          ) : stars >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 3 ? (
            <BsStarFill />
          ) : stars >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 4 ? (
            <BsStarFill />
          ) : stars >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 5 ? (
            <BsStarFill />
          ) : stars >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span> */}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
