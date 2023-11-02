import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

const Container: React.FC = () => {
  return (
    <div className={classNames('App')}>
      <Outlet />
    </div>
  );
};

export default Container;
