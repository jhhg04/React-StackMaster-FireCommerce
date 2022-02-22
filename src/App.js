import './App.css';
import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductInfo from './pages/ProductInfo';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/productinfo/:productid'
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/cart'
            exact
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};
