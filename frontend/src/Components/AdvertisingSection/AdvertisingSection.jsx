import Styles from './AdvertisingSection.module.css'

import { useAuth } from '../../hooks/auth'
import Swal from 'sweetalert2'

const AdvertisingSection = ({title, description, direction,image, position, color, top}) => {
    const { redirectBasedOnRole } = useAuth();

    function handleClick() {
        const condition = ({ user_is_host }) => user_is_host === 1;
        const path = '/property-manager';
        const actions = () => {}
        const onElseActions = () => {
            const condition = ({ user_is_host }) => { return user_is_host === 0 || (!user_is_host);}
            const actions = () => {
                Swal.fire({
                    title: 'Actualiza tu perfil',
                    text: 'Necesitas contar con un perfil de propietario para acceder a esta sección.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
            }
            redirectBasedOnRole( '/', condition, actions );
        }

        redirectBasedOnRole( path, condition, actions, onElseActions );
    }

    return (
    <article className={Styles.advertisingSectionContainer}>
        {position === 1 ? 
        <>
            <AdvertisingTitleBox title={title} image={image} color={color} top={top}/> 
            <AdvertisingInfoBox color={color} description={description} direction={direction} onClick={ handleClick }/>
        </> :
        <>
            <AdvertisingInfoBox color={color} description={description} direction={direction}/>
            <AdvertisingTitleBox title={title} image={image} color={color} top={top}/> 
        </>
        }
    </article>)
}

const AdvertisingTitleBox = ({title, image, color, top}) => {
    return (
        <section className={Styles.AdvertisingBox}>
            <img 
                src={image}
                alt=""
                className={Styles.imgAdvertising}
                draggable="false"
                style={{top: top}}
            />
            <div className={Styles.blurAdvertising} style={{background: color}}></div>
            <label htmlFor="" className={Styles.titleAdvertising}>{title}</label>
        </section>
    );
}
const AdvertisingInfoBox = ({color, description, direction, onClick}) => {
    return (
        <section className={Styles.AdvertisingBox}  style={{background: color, padding: '50px'}}>
            <label htmlFor="" className={Styles.advertisingDescription}>{description}</label>
            <button className={Styles.advertisingButton} onClick={ onClick }>Explorar</button>
        </section>
    );
}
export default AdvertisingSection;