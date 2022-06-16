import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CardOffers } from '../../types/offers';
import { changeFavoriteAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, ScreenType } from '../../const';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { changeCurrentHover, changeFavoriteActionCard } from '../../store/offers/offers';
import { redirectToRoute } from '../../store/action';

type PlacesList = {
  screenType: ScreenType;
  card: CardOffers,
}

function PlacesList(props: PlacesList):JSX.Element {
  const { screenType , card } = props;

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();


  const getScreenClassList = (type: ScreenType) => {
    switch (type) {
      case ScreenType.Offer:
        return ['near-places__card', 'near-places__image-wrapper', ''];
      case ScreenType.Favorites:
        return ['favorites__card', 'favorites__image-wrapper', 'favorites__card-info'];
      default:
        return ['cities__place-card', 'cities__image-wrapper', ''];
    }
  };

  return (
    <article
      id={`${card.id}`}
      key={card.id}
      className={`
            place-card ${getScreenClassList(screenType)[0]}
          `}
      onMouseEnter={(evt: MouseEvent<HTMLElement>) => {
        dispatch(changeCurrentHover(card));
      }}
      onMouseLeave={(evt: MouseEvent<HTMLElement>) => {
        dispatch(changeCurrentHover(null));
      }}
    >
      { card.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className={ `place-card__image-wrapper ${getScreenClassList(screenType)[1]}`}>
        <Link
          data-testid="linkOffer"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(redirectToRoute(`property/${card.id}`));
          }} to='\'
        >
          <img className="place-card__image" src={card.previewImage} width="260" height="200" alt="Photo studio" />
        </Link>
      </div>
      <div className={`place-card__info ${getScreenClassList(screenType)[2]}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={(evt) => {
              evt.preventDefault();
              if (authorizationStatus !== AuthorizationStatus.Auth) {
                dispatch(redirectToRoute(AppRoute.Login));
                return;
              }
              evt.currentTarget.classList.toggle('place-card__bookmark-button--active');
              dispatch(changeFavoriteAction({...card, isFavorite: !card.isFavorite}));
              dispatch(changeFavoriteActionCard(card));
            }}
            className={
              card.isFavorite ?
                'place-card__bookmark-button button place-card__bookmark-button--active' :
                'place-card__bookmark-button button'
            }
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${card.rating * 20  }%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link 
            to={`property/${card.id}`}

          }}
          >
            {card.title}
          </Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

export default PlacesList;
