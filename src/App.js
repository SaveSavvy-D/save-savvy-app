import Header from './components/common/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Expenses } from './components/pages/Expense/Expenses';
import Authentication from './components/pages/authentication/Authentication';
import { Budgets } from './components/pages/Budget/Budgets';
import Profile from './components/pages/Profile/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { Alerts } from './components/pages/alert/Alerts';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/budgets/:id/alerts' element={<Alerts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
