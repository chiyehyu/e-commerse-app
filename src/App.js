import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Checkout,
  PrivateRoute,
  Error,
  AuthWrapper,
  SharedLayout,
} from './pages';

import { useUserContext } from './context/user_context';

const Container = styled.div`
  background: green;
  color: white;
  .hero {
    font-size: 8rem;
  }
  h2 {
    color: red;
  }
`;

function App() {
  const { user, setUser } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* parent page to put shared layout: navbar, footer, ... */}
        <Route path="/" element={<SharedLayout />}>
          {/* index will match the path to the parent */}
          <Route index element={<Home />} /> {/* public pages */}
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productid" element={<SingleProduct />} />
          {/* authorized pages */}
          <Route
            path="checkout"
            element={
              <PrivateRoute user={user}>
                <Checkout user={user} />
              </PrivateRoute>
            }
          />
          {/* login page */}
          {/* <Route path="login" element={<Login setUser={setUser} />} /> */}
          {/* 404 page */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>

      {/* <Container>
        Inside Container
        <div className="hero">with className=hero</div>
      </Container> */}
    </BrowserRouter>
  );
}

export default App;
