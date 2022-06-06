
import { nanoid } from 'nanoid';
import { SortName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSort } from '../../store/offers/offers';
import { getCurrentSort } from '../../store/offers/selectors';

function Filter () :JSX.Element{
  const sortName = useAppSelector(getCurrentSort);
  const dispatch = useAppDispatch();

  const onFilterChange = (name : SortName) => {
    dispatch(changeSort(name));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        data-testid="selection-open"
        onClick={
          (evt) => {
            evt.preventDefault();
            const list = (evt.currentTarget.parentElement as HTMLElement).querySelector('.places__options');
            (list as HTMLElement).classList.toggle('places__options--opened');
          }
        }
      >
        {sortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" data-testid="filter-list">
        {Object.values(SortName).map((name) => (
          <li
            key={nanoid(10)}
            data-filter-name={name}
            className={`places__option ${sortName === name ?
              'places__option--active'
              : ''
            }`}
            tabIndex={0}
            onClick={(evt) => {
              evt.preventDefault();
              onFilterChange(evt.currentTarget.dataset.filterName as SortName);
              (evt.currentTarget.parentElement as HTMLElement).classList.toggle('places__options--opened', false);
            }}
          >
            {name}
          </li>
        ),
        )}
      </ul>
    </form>
  );
}

export default Filter;
