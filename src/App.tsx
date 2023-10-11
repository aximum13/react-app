import classNames from 'classnames';
import SongsPage from 'pages/SongsPage/SongsPage';

import './styles/app.scss';

const App = () => {
  return (
    <div className={classNames('App', 'container')}>
      <SongsPage />
    </div>
  );
};

export default App;
