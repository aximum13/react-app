import classNames from 'classnames';

import Content from 'components/Content';

import './styles/app.scss';

function App() {
  return (
    <div className={classNames('App', 'container')}>
      <Content />
    </div>
  );
}

export default App;
