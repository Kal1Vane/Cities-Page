import { Link } from 'react-router-dom';


function PageNotFound() :JSX.Element{
  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="box__ghost-container">
          <div className="box__ghost-eyes">
            <div className="box__eye-left" />
            <div className="box__eye-right" />
          </div>
          <div className="box__ghost-bottom">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div className="box__ghost-shadow" />
      </div>
      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-text">It seems like we couldn&#39;t find the page you were looking for</div>
        </div>
        <Link to='/' className="box__button">
          Go back
        </Link>
      </div>
    </div>

  );
}

export default PageNotFound;
