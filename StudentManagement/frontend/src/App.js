import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './Routes/Routes';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AllRoutes/>
    </BrowserRouter>
    </div>
  );
}

export default App;
