import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import MapMarkerImg from '../images/map-marker.svg'

import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import { NoSubstitutionTemplateLiteral } from 'typescript';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={ MapMarkerImg } alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :) </p>
        </header>

        <footer>
          <strong>Vitória da Conquista</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <Map 
        center={[-14.8605413, -40.8465268]}
        zoom = {13.4}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        
        {orphanages.map(orphanage => {
          <Marker
          icon={mapIcon}
          position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
  
          </Marker>
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff"></FiPlus>
      </Link>

    </div>
  )
}

export default OrphanagesMap;