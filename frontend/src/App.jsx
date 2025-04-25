import Authentication from './Pages/Authentication/Authentication.jsx';
import Home from './Pages/Home/Home.jsx';
import Profile from './Pages/Prof/Profile.jsx';
import MatchingPage from './Pages/RoommateMatchingPage.jsx';
import Map from './Pages/Map';

import { AuthProvider } from './hooks/auth';


import './main.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/matching" element={ <MatchingPage/>} />
          <Route path="/auth" element={<Authentication/>} />
          <Route path='/map' element={<Map />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App