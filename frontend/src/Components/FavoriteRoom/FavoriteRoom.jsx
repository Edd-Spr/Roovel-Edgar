import './FavoriteRoom.css';

const FavoriteCard = ({ titulo, descripcion, imagenes = [], etiquetas = [] }) => {
  const tagsArray = Array.isArray(etiquetas) ? etiquetas : etiquetas?.split(',') || [];
  const imageArray = Array.isArray(imagenes) ? imagenes : imagenes?.split(',') || [];

  return (
    <div className="roomCard">
      <img
        src={imageArray[0] || "./no_disponible.jpg"}
        alt={titulo}
        className="roomCardImg"
      />
      <div className="roomCardInfo">
        <h3 className="roomCardTitle">{titulo}</h3>
        <p className="roomCardDesc">{descripcion}</p>
        <div className="roomCardTags">
          {tagsArray.map((tag, idx) => (
            <span className="roomTag" key={idx}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
