import './App.css';
import { DomainProvider } from './components/context/DomainContext';
import { SearchPizzeria } from './components/pages/SearchPizzeria';
import { Pizzeria } from './components/pages/Pizzeria';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <DomainProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SearchPizzeria/>} path='/' exact/>
            <Route element={<Pizzeria/>} path='/:pizzeria/'/>
          </Routes>
        </BrowserRouter>
      </DomainProvider>
    </div>
  );
}

export default App;
