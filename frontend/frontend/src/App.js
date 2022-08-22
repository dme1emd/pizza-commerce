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
import { ConnectedRoutes } from './components/utils/ConnectedRoutes';
import { Home } from './components/pages/Home';
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
                <Route element={<ConnectedRoutes/>}>
                  <Route element={<Login/>} path='/login/' exact/>
                </Route>
                <Route element={<Home/>} path='/admin/'/>
              </Routes>
            </BrowserRouter>
          </AuthProvider> 
        </DomainProvider>
      </TotalProvider>
    </div>
  );
}

export default App;
