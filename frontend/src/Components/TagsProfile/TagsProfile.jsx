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
        const response = await fetch(`http://localhost:3000/profile/tags?currentUser=${currentUser}`);
        const data = await response.json();
        console.log("Etiquetas recibidas:", data.tags); // Debug
        setTags(data.tags || []);
      } catch (error) {
        console.error("Error al obtener las etiquetas:", error);
      }
    };

    fetchTags();
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
