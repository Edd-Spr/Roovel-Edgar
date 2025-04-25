import './FavoriteRoom.css';

const FavoriteCard = ({ titulo, descripcion, imagen, etiquetas }) => {
  return (
    <div className="roomCard">
      <img src={imagen} alt={titulo} className="roomCardImg" />
      <div className="roomCardInfo">
        <h3 className="roomCardTitle">{titulo}</h3>
        <p className="roomCardDesc">{descripcion}</p>
        <div className="roomCardTags">
          {etiquetas.map((tag, idx) => (
            <span className="roomTag" key={idx}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
