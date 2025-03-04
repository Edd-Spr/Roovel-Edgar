import '../Styles/AdvertisingSection.css'

const AdvertisingSection = ({title, description, direction,image, position, color, top}) => {
    return (
    <article className="advertisingSectionContainer">
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
        <section className='AdvertisingBox'>
            <img 
                src={image}
                alt=""
                className="imgAdvertising"
                style={{top: top}}
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