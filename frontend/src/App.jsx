import NavBar from './Components/NavBar.jsx';
import Authentication from './Pages/Authentication/Authentication.jsx';
import Home from './Pages/Home/Home.jsx';
import MatchingPage from './Pages/RoommateMatchingPage.jsx';


import Map from './Pages/Map';

import './main.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {

  return (
    <div style={{ display: "flex", flexWrap: "wrap", height: "100vh", width: "100vw" }}>
      <Router>
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/matching" element={ <MatchingPage/>} />
          <Route path="/auth" element={<Authentication/>} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </Router>
    </div>
)
}



export default App

