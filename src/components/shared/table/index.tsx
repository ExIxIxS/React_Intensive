import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryProps, ItemProps, TableProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';
import { AppDispatch } from 'src/store';

function Table(props: TableProps): JSX.Element {
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
          props.data.map((category) => <CategoryItem key={category.id} data={category} />)}
      </tbody>
    </table>
  );
}

function CategoryItem(props: CategoryProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const deleteItem = () => dispatch({ type: 'tableData/deleteCategory', payload: props.data.id });
  const toogleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      <tr className={`${styles['table-item']} ${styles['category-item']}`}>
        <td>
          {props.data.name} ({props.data.items.length || ''})
          <button className={styles['expand-button']} onClick={toogleIsExpanded}>
            {isExpanded ? '-' : '+'}
          </button>
        </td>
        <td>Checkbox</td>
        <td>{props.data.description}</td>
        <td>
          <button className={styles['delete-button']} onClick={deleteItem}>
            Delete
          </button>
        </td>
      </tr>
      {isExpanded &&
        props.data.items &&
        props.data.items.map((item) => (
          <TableItem key={item.id} categoryId={props.data.id} data={item} />
        ))}
    </>
  );
}

function TableItem(props: ItemProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const deleteItem = () =>
    dispatch({
      type: 'tableData/deleteItem',
      payload: { categoryId: props.categoryId, itemId: props.data.id },
    });

  return (
    <tr className={styles['table-item']}>
      <td>{props.data.name}</td>
      <td>Checkbox</td>
      <td>{props.data.description}</td>
      <td>
        <button className={styles['delete-button']} onClick={deleteItem}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Table;
