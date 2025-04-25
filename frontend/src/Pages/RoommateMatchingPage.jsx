
import Chat from '../Components/Chat.jsx';
import MatchRoommateContainer from '../Components/MatchRoommateContainer.jsx';
import RoommatesResult from '../Components/RoommatesResult.jsx';
import Layout from './Layout';

const Main = () =>{
    return(
      <Layout>
        <Chat/>
        <MatchRoommateContainer/>
      </Layout>
    );
  }

  export default Main;

