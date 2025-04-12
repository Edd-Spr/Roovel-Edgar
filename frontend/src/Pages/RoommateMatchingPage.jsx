
import Chat from '../Components/Chat.jsx';
import MatchRoommateContainer from '../Components/MatchRoommateContainer.jsx';
import RoommatesResult from '../Components/RoommatesResult.jsx';

const Main = () =>{
    return(
      <main 
        style={{
          display: 'flex',
          width: '100vw',
          overflow: 'hidden',   // ¡Esto oculta lo que se desborda!
          whiteSpace: 'nowrap'  // Asegura que los elementos no se bajen
        }}
      >
        <Chat/>
        <MatchRoommateContainer/>
      </main>
    );
  }

  export default Main;

