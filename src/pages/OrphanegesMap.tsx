import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import api from '../services/api';
import mapMakerImg from '../images/local.svg';

import '../styles/pages/orphaneges-map.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


const mapIcon = Leaflet.icon({
    iconUrl: mapMakerImg,

    iconSize: [38, 48],
    iconAnchor: [28, 68],
    popupAnchor: [170, 2]
});


export default function OrphanegesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    // 2 Parametros primeiro a função que vai executar, segundo parametro é quando, 
    // sempre que uma avariavel do array for alterada executa a função
    // caso passe vazio a função executa apenas uma vez

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMakerImg} alt="logoHappy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </footer>
            </aside>

            <Map 
            center={[-3.8443228,-38.612022]}
            zoom={16}
            style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */ }
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => {
                    return(
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        > 
                        <Popup 
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className={"map-popup"}
                        >
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff"/>
                            </Link>
                        </Popup>
                    
                        </Marker>
                    );
                })}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}