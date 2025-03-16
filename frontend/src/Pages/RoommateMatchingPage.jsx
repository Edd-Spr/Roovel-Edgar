
import Chat from '../Components/Chat.jsx';
import MatchRoommateContainer from '../Components/MatchRoommateContainer.jsx';
import RoommatesResult from '../Components/RoommatesResult.jsx';

const Main = () =>{
    return(
      <main style={{display: 'flex', width: '100vw'}}>
        <Chat/>
        <MatchRoommateContainer/>
      </main>
    );
  }

  export default Main;

