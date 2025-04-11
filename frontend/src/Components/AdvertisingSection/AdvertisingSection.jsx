import Styles from './AdvertisingSection.module.css'

const AdvertisingSection = ({title, description, direction,image, position, color, top}) => {
    return (
    <article className={Styles.advertisingSectionContainer}>
        {position === 1 ? 
        <>
            <AdvertisingTitleBox title={title} image={image} color={color} top={top}/> 
            <AdvertisingInfoBox color={color} description={description} direction={direction}/>
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
const AdvertisingInfoBox = ({color, description, direction}) => {
    return (
        <section className={Styles.AdvertisingBox}  style={{background: color, padding: '50px'}}>
            <label htmlFor="" className={Styles.advertisingDescription}>{description}</label>
            <button className={Styles.advertisingButton}>Explorar</button>
        </section>
    );
}
export default AdvertisingSection;