import Styles from './PropertyCard.module.css';
import { useState, useEffect, useRef } from 'react';

const PropertyCard = ({ property, setProperty, onPropertyCardClick, openHouseEditor }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div key={property.id_home} className={Styles['property-card']}>
            <div
                className={Styles['property-card__main-image-container']}
                onClick={() => onPropertyCardClick(property)}
            >
                <img 
                    src={property.mainImage[0].image_content} 
                    alt="" 
                    draggable="false"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: '0.3s',
                    }}
                />
            </div>

            <RenderImages 
                images={property.images} 
                onPropertyCardClick={onPropertyCardClick}
                property={property}
            />

            <div className={Styles['property-card__info']}>
                <h3 className={Styles['property-card__info-name']}>{property.home_name}</h3>
                <p className={Styles['property-card__info-address']}>{property.address}</p>

                <button 
                    className={Styles['property-card__info-button']} 
                    onClick={toggleMenu}
                    ref={buttonRef}
                >
                    ⋯
                </button>

                {showMenu && (
                    <div
                        className={Styles['property-card__dropdown']}
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul>
                            <li onClick={() => openHouseEditor(property)}>Editar</li> {/* Agregado */}
                            <li>Eliminar</li>
                            <li>Ver detalles</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

const RenderImages = ({ images, onPropertyCardClick, property }) => {
    const total = images.length;

    if (total === 0) {
        return (
            <div className={Styles['images-container']} onClick={() => onPropertyCardClick(property)}>
               <div className={Styles[`images-container__logo__container`]}>
                    <h1 className={Styles['images-container__logo']}>Roovel</h1>
                </div>
            </div>
        );
    } else if (total === 1) {
        return (
            <div className={Styles['images-container']} onClick={() => onPropertyCardClick(property)}>
                <div className={Styles['property-card__image-container']}>
                    <img
                        src={images[0].image_content}
                        alt=""
                        draggable="false"
                        className={Styles['images-container__image']}
                    />
                </div>
                <div className={`${Styles['images-container__logo__container-1']}`}>
                    <h1 className={Styles['images-container__logo']}>Roovel</h1>
                </div>
            </div>
        );
    } else if (total >= 2) {
        return (
            <div className={Styles['images-container']} onClick={() => onPropertyCardClick(property)}>
                {images.slice(0, 2).map((src, index) => (
                    <div
                        className={Styles['property-card__image-container']}
                        key={index}
                    >
                        <img
                            src={src.image_content}
                            className={Styles['images-container__image']}
                            draggable="false"
                            alt=""
                        />
                    </div>
                ))}
                <div className={Styles[`images-container__logo__container-${total}`]}>
                    <h1 className={Styles['images-container__logo']}>Roovel</h1>
                </div>
            </div>
        );
    }

    return null;
};

export default PropertyCard;