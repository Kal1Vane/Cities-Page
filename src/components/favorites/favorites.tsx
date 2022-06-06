import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, cities, DEFAULT_CITY, ScreenType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { fetchFavoritesAction } from '../../store/api-actions';
import { changingCity } from '../../store/offers/offers';
import { getFavorites } from '../../store/user/selectors';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import PlacesList from '../places-list/places-list';


function Favorites() :JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  },[dispatch]);

  const currentFavorites = useAppSelector(getFavorites);

  const currentCities = [...new Set(currentFavorites.map((offer) => offer.city.name))];
  if( currentFavorites.length === 0 ) {
    return (<FavoritesEmpty />);
  }
  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {currentCities.map((city) => (
                <li key={nanoid(10)} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className='locations__item-link'
                        to={'/'}
                        onClick={(evt) => {
                          const currentCity = cities.find((item) => item.title === city);
                          evt.preventDefault();
                          if(currentCity){
                            dispatch(changingCity(currentCity));
                          } else {
                            dispatch(changingCity(DEFAULT_CITY));
                          }
                          dispatch(redirectToRoute(AppRoute.Main));
                        }}
                      >
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    { currentFavorites.map((card) => {
                      if (card.city.name !== city){
                        return ('');
                      }

                      return (
                        <PlacesList
                          key={card.id}
                          card={card}
                          screenType={ScreenType.Favorites}
                        />
                      );
                    })}
                  </div>
                </li>
              ))}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>

  );
}
export default Favorites;
