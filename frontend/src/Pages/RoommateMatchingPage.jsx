
import Chat from '../Components/Chat.jsx';
import RoommatesResult from '../Components/RoommatesResult.jsx';

const Main = () =>{
    return(
      <main style={{display: 'flex', width: '100vw'}}>
        <Chat/>
        <RoommatesResult/>
      </main>
    );
  }

  export default Main;

