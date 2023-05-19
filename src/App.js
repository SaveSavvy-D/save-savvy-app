import Header from './components/common/Header';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Expenses } from './components/pages/Expense/Expenses';
import Authentication from './components/pages/authentication/Authentication';
import { Budgets } from './components/pages/Budget/Budgets';
import Profile from './components/pages/Profile/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { Alerts } from './components/pages/alert/Alerts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authSuccess } = useSelector((state) => state.user);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    console.log('In app.js useEffect');
    const fetchData = async () => {
      await dispatch(fetchUser());
      setFetchingUser(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!fetchingUser && !authSuccess) navigate('/auth');
  }, [fetchingUser, authSuccess]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/budgets' element={<Budgets />} />
        <Route path='/budgets/:id/alerts' element={<Alerts />} />
      </Routes>
    </div>
  );
}

export default App;
