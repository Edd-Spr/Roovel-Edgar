import Authentication from './Pages/Authentication/Authentication.jsx';
import Home from './Pages/Home/Home.jsx';
import Profile from './Pages/Prof/Profile.jsx';
import MatchingPage from './Pages/RoommateMatchingPage.jsx';
import PropertyManager from './Pages/PropertyManager';


import AdminDashboard from './Pages/admin/dashboard/index.jsx';
import AdminManagement from './Pages/admin/manage-admins/index.jsx';
import AdminSignUp from './Pages/admin/register';
import TyC from './Pages/TyC/TyC.jsx';

import Map from './Pages/Map';
import Favorite from './Pages/Favorite/Favorite.jsx';

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
          <Route path='/property-manager' element={<PropertyManager />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/TyC' element={<TyC />} />

          {/* Rutas de administración */}


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/admins" element={<AdminManagement />} />
          <Route path="/admin/register" element={<AdminSignUp />} />

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App