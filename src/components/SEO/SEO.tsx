import React, { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title || "Título Padrão";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description || "Descrição Padrão"
      );
    } else if (description) {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = description;
      document.head.appendChild(newMetaDescription);
    }

    return () => {
      document.title = "";
      if (metaDescription) {
        metaDescription.setAttribute("content", "");
      }
    };
  }, [title, description]);

  return null; // Não renderiza nada no corpo do componente
};

export default SEO;
