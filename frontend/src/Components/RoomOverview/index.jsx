import Styles from './RoomOverview.module.css';
import RoomOverviewSkeleton from './RoomOverviewSkeleton';
import { useState, useEffect } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RoomOverview = ({ 

    room_name,
    room_description,
    room_price,
    room_tags,
    room_images,
    room_main_image,
    room_address,
    room_owner,
    room_id,
    property, 
    setSelectedProperty, 
    closeRoomOverviewOpen, 
    setIsPropertyOverviewOpen 

    }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    console.log('room_main_image', room_main_image)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading || !room_name) return <RoomOverviewSkeleton />;

    const allImages = [
        room_main_image?.[0]?.image_content, room_main_image?.[0]?.image_src,
        ...(room_images?.map(image => image.image_content) || [])
      ];

    const openModalWithImage = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    };

    const goToPrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
    };

    return (
        <article
            className={Styles['property-overview__overlay']}
            onClick={() => {
                if (!isModalOpen) closeRoomOverviewOpen();
            }}
        >

            <motion.section
                className={Styles['property-overview__box-container']}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                onClick={(event) => event.stopPropagation()}
            >
                <button 
                    className={Styles['property-overview__action-button']} 
                    style={{left: '2rem'}}
                    onClick={() => {
                        setSelectedProperty(property); 
                        closeRoomOverviewOpen();
                        setIsPropertyOverviewOpen();
                    }}
                > 
                    <img 
                        src="/Graphics/Icons/arrow_back.png" 
                        alt="" 
                        draggable="false"
                        style={{width: '80%', marginLeft: '10px'}}
                    />
                </button>
                <button 
                    className={Styles['property-overview__action-button']} 
                    style={{right: '2rem'}}
                    onClick={closeRoomOverviewOpen}
                > 
                    <img 
                        src="/Graphics/Icons/close.png" 
                        alt="" 
                        draggable="false"
                        style={{width: '90%'}}
                    />
                </button>
                <motion.section
                    className={Styles['property-overview__images-container']}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        className={Styles['images-container__main-image__container']}
                        onClick={() => openModalWithImage(0)}
                        whileHover={{ scale: 1.03 }}
                    >
                        <img
                            src={room_main_image[0].image_content}
                            alt=""
                            draggable="false"
                            className={Styles['images-container__image']}
                        />
                    </motion.div>

                    <RenderImages
                        images={room_images}
                        openModalWithImage={(index) => openModalWithImage(index + 1)}
                    />

                    {room_images?.length > 4 && (
                        <motion.button
                            className={Styles['images-container__button-see-more']}
                            onClick={() => openModalWithImage(5)}
                            whileHover={{ scale: 1.05 }}
                        >
                            +{room.images.length - 4} más
                        </motion.button>
                    )}
                </motion.section>

                <motion.section
                    className={Styles['property-overview__info-container']}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={Styles['info-container__left__container']}>
                        <h1 className={Styles['info-container__name']}>{room_name}</h1>
                        <p className={Styles['info-container__address']}>{room_address}</p>
                        <div className={Styles['info-container__remaining-rooms']}>
                            <p className={Styles['remaining-rooms__number']}>
                                ${room_price}
                                <br/> 
                                <span className={Styles['remaining-rooms__subtitle']}>Mensuales</span></p>
                        </div>
                        <div className={Styles['remaining-rooms__tags-container']}>
                        {room_tags?.map(tag => (
                            <div key={tag.id_tag} className={Styles['property-tag__item']}>
                                <img src="/Graphics/Icons/paw-icon.png" alt="" className={Styles['property-tag__icon']} />
                                <span className={Styles['property-tag__name']} >{tag.tag_content}</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className={Styles['info-container__rigth__container']}>
                        <div className={Styles['info-container__rigth__buttons-container']}>
                            <motion.button
                                className={Styles['info-container__rigth__button-heart']}
                                onClick={() => setLiked(!liked)}
                                whileTap={{ scale: 0.8 }}
                            >
                                {liked ? (
                                    <RiHeartFill size={24} color="#CBA18A" />
                                ) : (
                                    <RiHeartLine size={24} color="#737373" />
                                )}
                            </motion.button>
                            <button className={Styles['info-container__rigth__button']}></button>
                            <button className={Styles['info-container__rigth__button']}></button>
                            <button className={Styles['info-container__rigth__button']}></button>
                        </div>
                        <div className={Styles['info-container__rigth__map-container']}>
                            <div className={Styles['rigth__map-title__container']}>Ver en el mapa</div>
                            <img 
                                src="Graphics/map_image.png" 
                                alt=""
                                draggable="false"
                                style={{ height: '100%' }}
                            />
                        </div>
                    </div>
                </motion.section>

                {(
                    <motion.section
                        className={Styles['property-overview__description-container']}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className={Styles['property-overview__logo-container']}>
                            <img 
                                src="/Graphics/park-image.png" 
                                alt="" 
                                draggable="false"
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <h1 className={Styles['property-overview__logo-title']}>Roovel</h1>
                        </div>
                        <div className={Styles['property-overview__des-container']}>
                            <h1 className={Styles['info-container__name']}>Descripción</h1>
                            <p className={Styles['property-overview__description']}>{room_description}</p>
                            {console.log('room_description----', room_id)}
                            <button   className={Styles['property-overview__button-reservation']}
                                onClick={() => {

                                    if (!room_id) {
                                    console.error('room_id no está definido');
                                    return;
                                    }
                                    const params = new URLSearchParams({
                                        room_id: room_id,
                                    }); 

                                    navigate(`/Pay?${params.toString()}`);
                                }}>Reservar Habitación</button>
                        </div>
                    </motion.section>
                )}
            </motion.section>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className={Styles['property-overview__modal-images__overlay']}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(event) => event.stopPropagation()} // Evita que el clic cierre el modal principal
                    >
                        <motion.button
                            onClick={goToPrevImage}
                            className={`${Styles['modal__nav-left']} ${Styles['modal__nav']}`}
                            whileHover={{ scale: 1.1 }}
                        >
                            <img src="/Graphics/Icons/arrow_back.png" alt="" draggable="false" style={{ height: '40%' }} />
                        </motion.button>

                        <motion.div
                            className={Styles['modal__content']}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <img
                                src={allImages[selectedImageIndex]}
                                alt="Imagen ampliada"
                                className={Styles['modal__image']}
                            />
                            <button
                                onClick={() => setIsModalOpen(false)} // Cierra solo el modal de imágenes
                                className={Styles['modal__close']}
                            >
                                ✕
                            </button>
                        </motion.div>

                        <motion.button
                            onClick={goToNextImage}
                            className={Styles['modal__nav']}
                            whileHover={{ scale: 1.1 }}
                        >
                            <img src="/Graphics/Icons/arrow_forward.png" alt="" draggable="false" style={{ width: '50%' }} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    );
};

const RenderImages = ({ images, openModalWithImage }) => {
    const total = images?.length;

    if (total === 0) {
        return (
            <div className={Styles['images-container__main-image__container']}>
                <div className={Styles['images-container__logo__container-1']}>
                    <h1 className={Styles['images-container__logo']}>Roovel</h1>
                </div>
            </div>
        );
    } else if (total === 1) {
        return (
            <motion.div
                className={Styles['images-container__main-image__container']}
                onClick={() => openModalWithImage(0)}
                whileHover={{ scale: 1.03 }}
            >
                <img
                    src={images[0].image_content}
                    alt=""
                    draggable="false"
                    className={Styles['images-container__image']}
                />
            </motion.div>
        );
    } else if (total === 2 || total === 3) {
        return (
            <div className={Styles['images-container-2-3']}>
                {images.map((src, index) => (
                    <motion.div
                        className={Styles['images-container__image__container']}
                        key={index}
                        onClick={() => openModalWithImage(index)}
                        whileHover={{ scale: 1.03 }}
                    >
                        <img
                            src={src.image_content}
                            className={Styles['images-container__image']}
                            draggable="false"
                        />
                    </motion.div>
                ))}
                <div className={Styles[`images-container__logo__container-${total}`]}>
                    <h1 className={Styles['images-container__logo']}>Roovel</h1>
                </div>
            </div>
        );
    } else if (total >= 4) {
        return (
            <div className={Styles['images-container-4']}>
                {images.slice(0, 4).map((src, index) => (
                    <motion.div
                        className={Styles['images-container__image__container']}
                        key={index}
                        onClick={() => openModalWithImage(index)}
                        whileHover={{ scale: 1.03 }}
                    >
                        <img
                            src={src.image_content}
                            className={Styles['images-container__image']}
                            draggable="false"
                        />
                    </motion.div>
                ))}
            </div>
        );
    }

    return null;
};

export default RoomOverview;