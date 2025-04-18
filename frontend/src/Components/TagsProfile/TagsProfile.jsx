import React, { useEffect, useState } from "react";
import "./TagsProfile.css";

const Etiqueta = ({ text }) => {
  return <span className="etiqueta">{text}</span>;
};

const TagsProfile = ({ currentUser }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tags?id_user=${currentUser}`);
        const data = await response.json();
        console.log("Etiquetas recibidas del backend:", data.tags);
        setTags(data.tags || []);
      } catch (error) {
        console.error("Error al obtener las etiquetas:", error);
      }
    };

    if (currentUser) {
      fetchTags();
    } else {
      console.warn("currentUser está vacío o undefined"); 
    }
  }, [currentUser]);

  return (
    <div className="tag-container">
      {tags && tags.length > 0 ? (
        tags.map((tag) => (
          <Etiqueta key={tag.id_tag} text={tag.tag_content} />
        ))
      ) : (
        <span className="etiqueta">Sin etiquetas</span>
      )}
    </div>
  );
};

export default TagsProfile;
