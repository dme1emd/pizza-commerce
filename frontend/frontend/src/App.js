import './App.css';
import { DomainProvider } from './components/context/DomainContext';
import { SearchPizzeria } from './components/pages/SearchPizzeria';

function App() {
  return (
    <div className="App">
      <DomainProvider>
         <SearchPizzeria/>     
      </DomainProvider>

    </div>
  );
}

export default App;
