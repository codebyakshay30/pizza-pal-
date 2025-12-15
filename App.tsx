import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Splash } from './pages/Splash';
import { Home } from './pages/Home';
import { PizzaDetails } from './pages/PizzaDetails';
import { Customize } from './pages/Customize';
import { AIRecommender } from './pages/AIRecommender';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pizza/:id" element={<PizzaDetails />} />
          <Route path="/customize/:id" element={<Customize />} />
          <Route path="/ai" element={<AIRecommender />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
