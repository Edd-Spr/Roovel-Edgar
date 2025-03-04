import NavBar from './Components/NavBar.jsx';
import Home from './Pages/Home.jsx';
import MatchingPage from './Pages/RoommateMatchingPage.jsx';


function App() {

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <NavBar/>
      {/*<Home/>*/}
      <MatchingPage/>
    </div>
)
}



export default App

