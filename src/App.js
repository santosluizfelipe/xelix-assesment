
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        <Navbar />
      </div>
      <Home />
    </div>
  );
}

export default App;
