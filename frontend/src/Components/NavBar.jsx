import '../Styles/NavBar.css';

const navActions = [
    {
        id: 1,
        name: 'Roomies',
        direction: '',
    },
    {
        id: 2,
        name: 'División de Finanzas',
        direction: '',
    },
    {
        id: 3,
        name: 'Publicar',
        direction: '',
    },
    {
        id: 4,
        name: 'Favoritos',
        direction: '',
    },
]

const NavBar = () => {

    return (
        <header className="barraNav">
            <p className="logoName">Roovel</p>
            <div className='barNavRigthContainer'>
                {navActions.map((actions) => (
                    <button className="actionButtons" key={actions.id}>{actions.name}</button>
                ))}

                <button className="notificationButton">
                <img 
                    src="/Graphics/Icons/campana-de-notificacion.png" 
                    alt="sd" 
                    style={{ width: '100%', height: '75%' }} 
                    draggable="false" 
                />
                </button>
                <div className="userPhotoProfileContainer">
                </div>
            </div>
        </header>
    );

}

export default NavBar;