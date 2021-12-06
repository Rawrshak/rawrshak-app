import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-homeDotsBackground">
      <div className="flex-grow flex flex-col">
        <Header />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
