// FourthStep.jsx
import Styles from './FourthStep.module.css';
import { motion } from 'framer-motion';

const FourthStep = ({ pendingRooms, openRoomEditor }) => {
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
                    onClick={() => openRoomEditor(null)}
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

                {pendingRooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        room={room}
                        onClick={() => openRoomEditor(room)}
                    />
                ))}
            </section>
        </motion.article>
    );
};

const RoomCard = ({ room, onClick }) => {
    return (
        <button
            className={Styles['fourth-step__room']}
            onClick={onClick}
        >
            <img
                src={room.mainImage[0].image_content || '/placeholder-room.jpg'}
                alt={room.name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: '0.3s',
                }}
            />
        </button>
    );
};

export default FourthStep;
