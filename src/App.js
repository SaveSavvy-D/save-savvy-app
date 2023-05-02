import Header from './components/common/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Expenses } from './components/pages/Expense/Expenses';
import store from './store/store';
import { Provider } from 'react-redux';
import Authentication from './components/pages/authentication/Authentication';
import { Budgets } from './components/pages/Budget/Budgets';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path='/' element={<h1>Dashboard</h1>} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/alerts' element={<h1>Alerts</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
