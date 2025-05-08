
import Chat from '../Components/Chat.jsx';
import MatchRoommateContainer from '../Components/MatchRoommateContainer.jsx';
import Layout from './Layout';
import { useAuth } from '../hooks/auth/index.jsx';

import Swal from 'sweetalert2';

import { useEffect } from 'react';

const Main = () => {
  const { redirectBasedOnRole } = useAuth();
  useEffect(()=>{
    const condition = ({ typeuser }) => typeuser === 0;
    const action = () => {
      Swal.fire({
        title: 'Error',
        text: 'No tienes permisos para acceder a esta página.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    redirectBasedOnRole('/auth', condition, action);
  }, [])

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

