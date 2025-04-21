import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TagsProfile.css";

const Etiqueta = ({ text }) => {
  return <span className="etiqueta">{text}</span>;
};

const TagsProfile = ({ currentUser }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tags?id_user=${currentUser}`);
        console.log("Respuesta cruda:", response.data);

        const data = Array.isArray(response.data) ? response.data : response.data.tags;
        setTags(data || []);
      } catch (error) {
        console.error("Error al obtener las etiquetas:", error);
      }
    };

    if (currentUser) fetchTags();
  }, [currentUser]);

  return (
    <div className="tag-container">
      {tags.length > 0 ? (
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
