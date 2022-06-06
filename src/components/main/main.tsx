import PlacesList from '../places-list/places-list';
import Maps from '../maps/maps';
import { ScreenType} from '../../const';
import CityScreen from '../city/city';
import { useAppSelector } from '../../hooks';
import Filter from '../filter/filter';
import { getCurrentCity, getFilterOffers } from '../../store/offers/selectors';


function Main(): JSX.Element {
  const cityChoise = useAppSelector(getCurrentCity);
  const currentOffers = useAppSelector(getFilterOffers);

  return (
    <div className="page page--gray page--main">
      <main
        className={
          currentOffers.length === 0 ?
            'page__main page__main--index page__main--index-empty' :
            'page__main page__main--index'
        }
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityScreen/>
          </section>
        </div>
        <div className="cities">
          <div className={
            currentOffers.length === 0 ?
              'cities__places-container cities__places-container--empty container' :
              'cities__places-container container'
          }
          >
            { currentOffers.length === 0 ?
              <>
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {cityChoise.title}</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </> :
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentOffers.length} places to stay in {cityChoise.title}</b>
                  <Filter />
                  <div
                    className="cities__places-list places__list tabs__content"
                  >
                    {currentOffers.map((card) => (
                      <PlacesList
                        card={card}
                        screenType={ScreenType.Main}
                        key={card.id}
                      />))}

                  </div>

                </section>
                <div className="cities__right-section">
                  <section
                    className="cities__map map"
                    style={{ height: '700px' }}
                  >
                    <Maps
                      offersCard={currentOffers}
                      city={cityChoise}
                    />
                  </section>
                </div>
              </>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;


