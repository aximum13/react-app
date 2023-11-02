import classNames from 'classnames';

import { Button, ButtonGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import styles from './ButtonsGroup.module.scss';

interface ButtonsGroupTypes {
  isDetail?: boolean;
  handleLeftBtn?: () => void;
  handleRightBtn?: () => void;
}

const ButtonsGroup: React.FC<ButtonsGroupTypes> = ({
  isDetail,
  handleLeftBtn,
  handleRightBtn,
}) => {
  return (
    <ButtonGroup>
      <Button
        className={classNames({ [styles.ButtonShowDetail]: isDetail }, 'me-3')}
        variant={isDetail ? 'outline-success' : 'outline-primary'}
        onClick={handleLeftBtn}
      >
        {isDetail ? <BsSearch /> : <FiEdit />}
      </Button>
      <Button
        className={classNames({ [styles.ButtonDelete]: !isDetail })}
        variant={isDetail ? 'outline-primary' : 'outline-danger'}
        onClick={handleRightBtn}
      >
        {isDetail ? <FiEdit /> : <RiDeleteBin6Line />}
      </Button>
    </ButtonGroup>
  );
};
export default ButtonsGroup;
