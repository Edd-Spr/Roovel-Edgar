import '../Styles/AdvertisingSection.css'

const AdvertisingSection = ({title, description, direction,image, position, color}) => {
    return (
    <article className="advertisingSectionContainer">
        {position === 1 ? 
        <>
            <AdvertisingTitleBox title={title} image={image} color={color}/> 
            <AdvertisingInfoBox color={color} description={description} direction={direction}/>
        </> :
        <>
            <AdvertisingInfoBox color={color} description={description} direction={direction}/>
            <AdvertisingTitleBox title={title} image={image} color={color}/> 
        </>
        }
    </article>)
}

const AdvertisingTitleBox = ({title, image, color}) => {
    return (
        <section className='AdvertisingBox'>
            <img 
                src={image}
                alt=""
                className="imgAdvertising"
            />
            <div className="bluAdvertising" style={{background: color}}></div>
            <label htmlFor="" className='titleAdvertising'>{title}</label>
        </section>
    );
}
const AdvertisingInfoBox = ({color, description, direction}) => {
    return (
        <section className='AdvertisingBox'  style={{background: color, padding: '50px'}}>
            <label htmlFor="" className="advertisingDescription">{description}</label>
            <button className="advertisingButton">Explorar</button>
        </section>
    );
}
export default AdvertisingSection;