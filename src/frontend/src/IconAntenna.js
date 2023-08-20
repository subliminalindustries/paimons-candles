import L from 'leaflet';

const IconAntenna = new L.Icon({
    iconUrl: 'marker-antenna.png',
    iconRetinaUrl: 'marker-antenna.png',
    iconAnchor: [0, 0],
    popupAnchor: [16, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(16, 16),
    className: 'leaflet-div-icon'
});

export default IconAntenna
