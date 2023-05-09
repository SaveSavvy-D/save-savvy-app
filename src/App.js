import Header from './components/common/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Expenses } from './components/pages/Expense/Expenses';
import Authentication from './components/pages/authentication/Authentication';
import { Budgets } from './components/pages/Budget/Budgets';
import Dashboard from './components/pages/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/budgets' element={<Budgets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
