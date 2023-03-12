import React, { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { productid: id } = useParams();
  const navigate = useNavigate(); //const history = useHistory(); //in react-router-dom 6, useHistory is replaced by useNavigate
  const {
    singleProductLoading: loading,
    singleProductError: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
    //return <Navigate to="/" />;
  }

  //console.log(product);
  const {
    id: sku,
    name,
    price,
    reviews,
    shipping,
    stars,
    stock,
    category,
    company,
    description,
    images,
    colors,
  } = product;
  //console.log(product);

  return (
    <Wrapper>
      {/* note that <PageHero product /> if we use this syntax, it will only bring in 'true' value for the property 'product' to the component*/}
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Stock:</span>
              {stock > 0 ? `${stock}` : 'out of stock'}
            </p>
            <p className="info">
              <span>SKU:</span>
              {id}
            </p>
            <p className="info">
              <span>Brand:</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
