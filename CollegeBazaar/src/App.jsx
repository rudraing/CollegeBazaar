import { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch, Provider } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'; // Import logout action
import Login from './components/Login';
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
       
        dispatch(logout());
      })
      .finally(() => { // Wrap setLoading(false) in a function
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-amber-100'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App;
