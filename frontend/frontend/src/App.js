import './App.css';
import { DomainProvider } from './components/context/DomainContext';
import { SearchPizzeria } from './components/pages/SearchPizzeria';
import { Pizzeria } from './components/pages/Pizzeria';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Shipping } from './components/pages/Shipping';
function App() {
  return (
    <div className="App">
      <DomainProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SearchPizzeria/>} path='/' exact/>
            <Route element={<Pizzeria/>} path='/:pizzeria/'/>
            <Route element={<Shipping/>} path='/shipping/'/>
          </Routes>
        </BrowserRouter>
      </DomainProvider>
    </div>
  );
}

export default App;
