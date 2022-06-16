

import { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../../hooks';
import { fetchCommentsAction, fetchOfferAction, fetchNearbyAction, changeFavoriteAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import Maps from '../maps/maps';
import FormComment from '../form-comment/form-comment';
import PlacesList from '../places-list/places-list';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, ScreenType } from '../../const';
import {useParams} from 'react-router';

import {  redirectToRoute } from '../../store/action';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getComments, getNearby, getOfferLoad } from '../../store/property/selectors';
import { changeFavoriteActionCard } from '../../store/offers/offers';

function Property() :JSX.Element {
  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchCommentsAction(id));
    dispatch(fetchNearbyAction(id));

  }, [dispatch, id]);

  const currentCard = useAppSelector(getOfferLoad);
  const currentComments =  useAppSelector(getComments);
  const currentNearby = useAppSelector(getNearby);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  let city = DEFAULT_CITY;

  if (currentCard){
    city = {
      title: currentCard.city.name,
      latitude: currentCard.location.latitude,
      longitude: currentCard.location.longitude,
      zoom: 13,
    };
  }


  function onFavoriteClick(evt : React.MouseEvent<HTMLButtonElement>){
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }
    evt.currentTarget.classList.toggle('property__bookmark-button--active');
    if(currentCard){
      dispatch(changeFavoriteAction({...currentCard, isFavorite: !currentCard.isFavorite}));
    }
    dispatch(changeFavoriteActionCard(currentCard));
  }

  if ( !currentCard ) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentCard.images.map((img) => (
                <div key={currentCard.id + img} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={img}
                    alt='Photo Gallery'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentCard.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentCard.title}
                </h1>
                <button
                  onClick={onFavoriteClick}
                  className={`property__bookmark-button ${currentCard.isFavorite && 'property__bookmark-button--active'} button`}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${currentCard.rating * 20  }%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentCard.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentCard.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentCard.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
              Max  {currentCard.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€ {currentCard.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&#39;s inside</h2>
                <ul className="property__inside-list">
                  {currentCard.goods.map((item) => (
                    <li key={currentCard.id + item} className="property__inside-item">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={
                    currentCard.host.isPro?
                      'property__avatar-wrapper user__avatar-wrapper property__avatar-wrapper--pro' :
                      'property__avatar-wrapper user__avatar-wrapper'
                  }
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={`/${currentCard.host.avatarUrl}`}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{currentCard.host.name}</span>
                  <span className="property__user-status">
                    {currentCard.host.isPro && 'pro'}
                    {!currentCard.host.isPro && ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentCard.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{currentComments.length}</span>
                </h2>
                <ul className="reviews__list">
                  {currentComments.map((review) => (
                    <li key={currentCard.id + review.rating} className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="reviews__avatar user__avatar"
                            src={review.user.avatarUrl}
                            width={54}
                            height={54}
                            alt="Reviews avatar"
                          />
                        </div>
                        <span className="reviews__user-name">{review.user.name}</span>
                        {review.user.isPro ?
                          <span className="property__user-status">
                          Pro
                          </span> : ''}
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: `${review.rating * 20  }%`}} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          {review.comment}
                        </p>
                        <time className="reviews__time" dateTime={review.date}>
                          {review.date}
                        </time>
                      </div>
                    </li>))}
                </ul>
                <FormComment/>
              </section>
            </div>
          </div>
          <section className="property__map map" >
            <Maps
              offersCard={currentNearby}
              city={city}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {currentNearby.map((card) => (
                <PlacesList
                  card={card}
                  screenType={ScreenType.Offer}
                  key={card.id}
                />
              ))}

            </div>
          </section>
        </div>
      </main>
    </div>

  );
}
export default Property;


