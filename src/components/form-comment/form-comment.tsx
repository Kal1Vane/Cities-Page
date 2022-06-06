import { nanoid } from 'nanoid';
import React, { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus, MAX_RATING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCommentAction } from '../../store/api-actions';
import { getComments } from '../../store/property/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';

function FormComment() :JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [rating, setUserRating] = useState<number | null>(null);
  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const {id} = useParams<{id: string}>();
  const [isDisabledBtn,setIsDisabledBtn] = useState(true);
  const currentComments =  useAppSelector(getComments);

  const stars = (new Array(MAX_RATING)).fill(null).map((_, index) => index + 1).reverse();

  useEffect(() => {
    setFormDisabled(false);
    document.querySelector('form')?.reset();
    setIsDisabledBtn(true);
    setUserRating(null);
  }, [currentComments]);

  function onSubmitForm(evt: FormEvent<HTMLFormElement>):void {
    evt.preventDefault();
    if (textArea.current !== null && rating !== null) {
      setFormDisabled(true);
      dispatch(setCommentAction({
        offerId: Number(id) as number,
        comment: textArea.current.value,
        rating,
      }));
    }
  }

  function onChangeComment(evt: React.ChangeEvent<HTMLTextAreaElement>){
    evt.preventDefault();

    if (evt.currentTarget.validity.valid && isDisabledBtn && rating !== null) {
      setIsDisabledBtn(false);
    } else if (!evt.currentTarget.validity.valid && !isDisabledBtn) {
      setIsDisabledBtn(true);
    }
  }
  function onChangeRating(evt: React.ChangeEvent<HTMLInputElement>) {
    setUserRating(Number(evt.target.value));

    if (document.querySelector('textarea')?.checkValidity() && document.querySelector('textarea')?.value !== ''){
      setIsDisabledBtn(false);
    }
  }
  if(authorizationStatus === AuthorizationStatus.NoAuth ||
     authorizationStatus === AuthorizationStatus.Unknown ){
    return (
      <>
      </>);
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmitForm}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className="reviews__rating-form form__rating"

      >
        {stars.map((item) => (
          <Fragment key={nanoid(10)}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={item}
              id={`${item}-stars`}
              type="radio"
              checked={rating === item}
              onChange={onChangeRating}
            />
            <label
              htmlFor={`${item}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={onChangeComment}
        ref={textArea}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe
            your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        {isDisabledBtn ?
          <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button> :
          <button className="reviews__submit form__submit button" type="submit" >Submit</button>}

      </div>
    </form>

  );
}

export default FormComment;
