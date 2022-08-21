import './App.css';
import { DomainProvider } from './components/context/DomainContext';
import { SearchPizzeria } from './components/pages/SearchPizzeria';
import { Pizzeria } from './components/pages/Pizzeria';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Shipping } from './components/pages/Shipping';
import { TotalProvider } from './components/context/TotalContext';
import {AuthProvider} from './components/context/AuthContext';
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';
function App() {
  return (
    <div className="App">
      <TotalProvider>
        <DomainProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<SearchPizzeria/>} path='/' exact/>
                <Route element={<Pizzeria/>} path='/:pizzeria/'/>
                <Route element={<Shipping/>} path='/shipping/'/>
                <Route element={<Signup/>} path='/signup/' exact/>
                <Route element={<Login/>} path='/login/' exact/>
              </Routes>
            </BrowserRouter>
          </AuthProvider> 
        </DomainProvider>
      </TotalProvider>
    </div>
  );
}

export default App;
