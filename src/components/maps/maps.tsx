import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { currentCustomIcon, defaultCustomIcon } from '../../const';
import { useAppSelector } from '../../hooks';
import './map.css';
import {  CardOffers,  City } from '../../types/offers';
import { useRef } from 'react';
import { checkDescription } from '../../utils/utils';
import { getHoverOffer } from '../../store/offers/selectors';
import { Map } from 'leaflet';


type MapScreenProps = {
  offersCard: CardOffers[];
  city: City,
}

function Maps (props: MapScreenProps): JSX.Element{
  const { offersCard,city } = props;
  const popUpMap = useRef<Map>(null);
  const currentOfferNew = useAppSelector(getHoverOffer);

  function closePopup(){
    if (!popUpMap.current || !popUpMap) {return;}
    popUpMap.current.closePopup();
  }
  function MapComponent() {
    const map = useMap();
    if (map !== null && map !== undefined){
      map.panTo([city.latitude,city.longitude]);
    }
    return null;
  }

  return (
    <MapContainer
      ref={popUpMap}
      style={{height: '700px'}}
      center={[
        city.latitude,
        city.longitude,
      ]}
      zoom={
        city.zoom
      }
      scrollWheelZoom
    >
      <MapComponent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {offersCard.map((offer) => {
        const { location } = offer;

        return (
          <Marker
            key={offer.id + location.latitude}
            icon={
              currentOfferNew !== undefined && currentOfferNew !== null && currentOfferNew.id === offer.id ?
                currentCustomIcon :
                defaultCustomIcon
            }
            position={[
              location.latitude,
              location.longitude,
            ]}
          >
            <Popup closeButton={false}>
              <button className='popup-close-button-map' onClick={closePopup}>×</button>
              <div className='popup-map'>
                <div  className='popup-map-left'>
                  <img src={offer.previewImage} alt="Photo Studio" width="100%" height="100%" />
                </div>
                <div  className='popup-map-right'>
                  <h2 className="place-card__name">
                    <Link to={`property/${offer.id} `}>
                      {offer.title}
                    </Link>
                  </h2>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: `${offer.rating * 20  }%`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="place-card__type">{checkDescription(offer.description)}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
}
export default Maps;
