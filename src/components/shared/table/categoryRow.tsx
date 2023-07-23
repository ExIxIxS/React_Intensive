import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectTableActiveCell } from 'src/store/features/tableDataSlice';

import TableCell from 'src/components/shared/table/tableCell';
import TableRow from 'src/components/shared/table/tableRow';
import NewRowButton from './newRowButton';

import { CategoryProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

function CategoryRow(props: CategoryProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeCell = useSelector(selectTableActiveCell);

  const toogleIsExpanded = () => setIsExpanded(!isExpanded);

  const expand = () => setIsExpanded(true);

  const isActiveCellInItems = (): boolean => {
    if (!props.data.items.length) {
      return false;
    }

    const firstRowItemIndex = props.rowIndex + 1;

    const rowLimits: { min: number; max: number } = {
      min: firstRowItemIndex,
      max: firstRowItemIndex + props.data.items.length - 1,
    };

    return activeCell.row >= rowLimits.min && activeCell.row <= rowLimits.max;
  };

  if (isActiveCellInItems() && !isExpanded) {
    expand();
  }

  return (
    <>
      <tr className={styles['table-row']}>
        <TableCell
          type="category name"
          categoryId={props.data.id}
          rowIndex={props.rowIndex}
          columnIndex={0}
          text={props.data.name}
          itemsAmount={props.data.items.length}
          isExpanded={isExpanded}
          clickHandler={toogleIsExpanded}
        />
        <TableCell
          type="checkbox"
          categoryId={props.data.id}
          rowIndex={props.rowIndex}
          columnIndex={1}
          isChecked={props.data.isChecked}
        />
        <TableCell
          type="description"
          categoryId={props.data.id}
          rowIndex={props.rowIndex}
          columnIndex={2}
          text={props.data.description}
        />
        <TableCell
          type="delete"
          categoryId={props.data.id}
          rowIndex={props.rowIndex}
          columnIndex={3}
        />
      </tr>
      {isExpanded && props.data.items && (
        <>
          <NewRowButton type="item" categoryId={props.data.id} />
          {props.data.items.map((item, index) => (
            <TableRow
              key={item.id}
              categoryId={props.data.id}
              data={item}
              rowIndex={props.rowIndex + index + 1}
            />
          ))}
        </>
      )}
    </>
  );
}

export default CategoryRow;
