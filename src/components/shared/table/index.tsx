import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'src/store';
import { selectTableActiveCell } from 'src/store/features/tableDataSlice';

import {
  ActiveCell,
  CategoryProps,
  ItemProps,
  TableProps,
} from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

function getCellClassName(activeCell: ActiveCell, rowIndex: number, columnIndex: number): string {
  return activeCell.row === rowIndex && activeCell.column === columnIndex
    ? styles['active-cell']
    : '';
}

function Table(props: TableProps): JSX.Element {
  let nextCategoryIndex = 0;

  return (
    <table className={styles['table']}>
      <thead className={styles['table-header']}>
        <tr>
          <th>Name</th>
          <th>Checkbox</th>
          <th>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((category) => {
            const item = (
              <CategoryItem key={category.id} data={category} rowIndex={nextCategoryIndex} />
            );

            nextCategoryIndex += category.items.length + 1;

            return item;
          })}
      </tbody>
    </table>
  );
}

function CategoryItem(props: CategoryProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const activeCell = useSelector(selectTableActiveCell);

  const deleteItem = () => dispatch({ type: 'tableData/deleteCategory', payload: props.data.id });
  const toogleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      <tr className={`${styles['table-item']} ${styles['category-item']}`}>
        <td className={getCellClassName(activeCell, props.rowIndex, 0)}>
          {props.data.name} ({props.data.items.length || ''})
          <button className={styles['expand-button']} onClick={toogleIsExpanded}>
            {isExpanded ? '-' : '+'}
          </button>
        </td>
        <td className={getCellClassName(activeCell, props.rowIndex, 1)}>Checkbox</td>
        <td className={getCellClassName(activeCell, props.rowIndex, 2)}>
          {props.data.description}
        </td>
        <td className={getCellClassName(activeCell, props.rowIndex, 3)}>
          <button className={styles['delete-button']} onClick={deleteItem}>
            Delete
          </button>
        </td>
      </tr>
      {isExpanded &&
        props.data.items &&
        props.data.items.map((item, index) => (
          <TableItem
            key={item.id}
            categoryId={props.data.id}
            data={item}
            rowIndex={props.rowIndex + index + 1}
          />
        ))}
    </>
  );
}

function TableItem(props: ItemProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const activeCell = useSelector(selectTableActiveCell);

  const deleteItem = () =>
    dispatch({
      type: 'tableData/deleteItem',
      payload: { categoryId: props.categoryId, itemId: props.data.id },
    });

  return (
    <tr className={styles['table-item']}>
      <td className={getCellClassName(activeCell, props.rowIndex, 0)}>{props.data.name}</td>
      <td className={getCellClassName(activeCell, props.rowIndex, 1)}>Checkbox</td>
      <td className={getCellClassName(activeCell, props.rowIndex, 2)}>{props.data.description}</td>
      <td className={getCellClassName(activeCell, props.rowIndex, 3)}>
        <button className={styles['delete-button']} onClick={deleteItem}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Table;
