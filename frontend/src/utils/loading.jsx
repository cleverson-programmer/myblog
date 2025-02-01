import React from 'react';
import  {  Hypnosis  }  from  "react-cssfx-loading";
import './loading.css'; // Importando o arquivo de estilos

export default function Loading() {
  return (
    <div className="loading-overlay">
      <Hypnosis color="#2E2D78" width="60px" height="60px" duration="3s" />
    </div>
  );
}
