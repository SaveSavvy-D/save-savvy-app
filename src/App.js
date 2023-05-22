import Header from './components/common/Header';
import { Routes, Route } from 'react-router-dom';
import { Expenses } from './components/pages/Expense/Expenses';
import Authentication from './components/pages/authentication/Authentication';
import { Budgets } from './components/pages/Budget/Budgets';
import Profile from './components/pages/Profile/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { Alerts } from './components/pages/alert/Alerts';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/routing/PrivateRoute';
import { AppSpinner } from './components/common/AppSpinner';

function App() {
  const { status } = useSelector((state) => state.user);
  if (status === 'loading') return <AppSpinner />;
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route
          exact
          path='/'
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/profile' element={<PrivateRoute component={Profile} />} />
        <Route
          path='/expenses'
          element={<PrivateRoute component={Expenses} />}
        />
        <Route path='/budgets' element={<PrivateRoute component={Budgets} />} />
        <Route
          path='/budgets/:id/alerts'
          element={<PrivateRoute component={Alerts} />}
        />
      </Routes>
    </div>
  );
}

export default App;
