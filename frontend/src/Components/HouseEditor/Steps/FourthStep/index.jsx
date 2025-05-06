import Styles from './FourthStep.module.css';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const FourthStep = ({ openRoomEditor, rooms, onDelete }) => {
    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1vw',
                boxSizing: 'border-box',
                padding: '3rem',
                paddingBottom: '4rem',
                overflowY: 'auto',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={Styles['fourth-step__title']}>Personalizar Habitaciones (Opcional)</h1>

            <section className={Styles['fourth-step__note']} style={{ gridColumn: '1 / -1' }}>
                <p className={Styles['fourth-step__note-text']}>
                    Puedes añadir y personalizar habitaciones para alquilarlas por separado, o si prefieres alquilar la casa completa unicamente pasa al siguiente paso
                </p>
            </section>

            <section className={Styles['fourth-step__rooms-container']} style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1vw' }}>
                <button
                    className={Styles['fourth-step__add-room']}
                    onClick={ openRoomEditor }
                >
                    <img 
                        src="/Graphics/Icons/add-icon_gray.png" 
                        alt=""
                        draggable="false"
                        style={{
                            width: '30%',
                        }}
                    />
                </button>

                {rooms?.map((room, index) => (
                    <RoomCard
                        key={room.id_room} 
                        room={room}
                        onClick={() => openRoomEditor(room)}
                        onDelete={ () => onDelete( index ) }
                    />
                ))}
            </section>
        </motion.article>
    );
};

const RoomCard = ({ room, onClick, onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
            <div className={Styles['fourth-step__room']}>
                <img
                    src={room?.images[0] || '/placeholder-room.jpg'}
                    alt={room?.name}
                    className={Styles['fourth-step__room-image']}
                />

                <div className={Styles['fourth-step__menu-wrapper']} ref={menuRef}>
                    <button
                        className={Styles['fourth-step__menu-toggle']}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ...
                    </button>
                    {menuOpen && (
                        <div className={Styles['fourth-step__menu']}>
                            <button
                                className={Styles['fourth-step__menu-item']}
                                onClick={onClick}
                            >
                                Editar
                            </button>
                            <button
                                className={Styles['fourth-step__menu-item']}
                                onClick={() => {
                                    setMenuOpen(false);
                                    onDelete();
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>
    );
};


export default FourthStep;
