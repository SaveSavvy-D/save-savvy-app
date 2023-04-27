import Header from './components/common/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
