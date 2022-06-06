import {nanoid} from 'nanoid';
import { cities } from '../../const';
import {  useAppDispatch, useAppSelector } from '../../hooks';
import { changingCity } from '../../store/offers/offers';
import { getCurrentCity } from '../../store/offers/selectors';


function CityScreen () : JSX.Element  {
  const city = cities;
  const cityChoise  = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  return (

    <ul className="locations__list tabs__list" >

      {city.map((town) => (
        <li
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(changingCity(town));
          }}
          data-city={town.title}
          key={nanoid(10)}
          className="locations__item"
        >
          <a
            href='/'
            className={cityChoise.title === town.title ?
              'locations__item-link tabs__item tabs__item--active' :
              'locations__item-link tabs__item '}
          >
            <span>{town.title}</span>
          </a>
        </li>
      ))}
    </ul>

  );
}
export default CityScreen;
