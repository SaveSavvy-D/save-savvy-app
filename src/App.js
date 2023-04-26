import Header from './components/common/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/expenses" element={<h1>Expenses</h1>} />
          <Route path="/budgets" element={<h1>Budgets</h1>} />
          <Route path="/alerts" element={<h1>Alerts</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
