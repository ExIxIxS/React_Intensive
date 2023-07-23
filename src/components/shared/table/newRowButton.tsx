import { useDispatch } from 'react-redux';
import { NewRowButtonProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';
import { tableDataActions } from 'src/store/features/tableDataSlice';

function NewRowButton(props: NewRowButtonProps): JSX.Element {
  const dispatch = useDispatch();

  const handleClick = (): void => {
    if (props.type === 'item' && props.categoryId) {
      const action = tableDataActions.createNewRowItem({ categoryId: props.categoryId });

      dispatch(action);
    } else {
      const action = tableDataActions.createNewCategory();

      dispatch(action);
    }
  };

  return (
    <tr className={styles['table-row']} onClick={handleClick}>
      <td className={styles['new-row-button']} colSpan={4}>{`Create a new ${props.type}`}</td>
    </tr>
  );
}

export default NewRowButton;
