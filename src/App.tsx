import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { useState } from 'react';

function App() {

  /*
  state for the search term, used by header and whatever 
  page is being used to display the results
  */
  const [searchTerm,setSearchTerm] = useState<string>('')
  const [isNightMode,setIsNightMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: light)').matches)


  /*return the header and body, both taaking in the searchTerm state*/
  return (
    <div className="flex flex-col justify-between min-h-screen bg-homeDotsBackground">
      <div className="flex-grow flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsNightMode={setIsNightMode} isNightMode={isNightMode}/>
        <Body searchTerm={searchTerm}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
