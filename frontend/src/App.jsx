import NavBar from './Components/NavBar.jsx';
import Authentication from './Pages/Authentication/Authentication.jsx';
import Home from './Pages/Home/Home.jsx';
import MatchingPage from './Pages/RoommateMatchingPage.jsx';

function App() {

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/*
      <NavBar/>
      <Home/>
      <MatchingPage/>
      <Authentication/>
      */}
      <Authentication/>
    </div>
)
}



export default App

