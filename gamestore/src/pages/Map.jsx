import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useState } from 'react';
import SendEmail from '../components/SendEmail';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25,41], 
  iconAnchor: [12,41],
  popupAnchor: [2, -40]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Shops(){

    const[coordinaates, setCoordinates] = useState({lngLat: [57.78668420247636, 26.036616463826466], zoom: 11  });




    return(
    <div>
      <SendEmail />


<div className='kaart'>    
<p>Valga Kodu</p>

        <MapContainer  className='map' center={coordinaates.lngLat} zoom={coordinaates.zoom} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[57.769139967720115, 26.049923527085905]}>
    <Popup>
      Valga kodu. <br /> Avatud 24/7.
    </Popup>
    
    
  </Marker>
</MapContainer>
</div>
<div className='kaart'>
<p>Lüllemäe Kodu</p>

        <MapContainer  className='map' center={[57.756191077538766, 26.374884860156108]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[57.75464311025581, 26.38038415484928]}>
    <Popup>
      Lülleka kodu. <br /> Avatud 24/7.
    </Popup>
    
    
  </Marker>
</MapContainer>
</div>







</div>)






}
export default Shops;