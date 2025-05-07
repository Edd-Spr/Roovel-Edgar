
import Chat from '../Components/Chat.jsx';
import MatchRoommateContainer from '../Components/MatchRoommateContainer.jsx';
import Layout from './Layout';

const Main = () =>{
    return(
      <Layout height='92vh'>
        <div  style={{display: 'flex',  width: '100%', height: '100%'}}>
          <Chat/>
          <MatchRoommateContainer/>
        </div>
      </Layout>
    );
  }

  export default Main;

