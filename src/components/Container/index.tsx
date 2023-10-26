import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

const Container: React.FC = () => {
  return (
    <div className={classNames('App', 'container')}>
      <Outlet />
    </div>
  );
};

export default Container;
