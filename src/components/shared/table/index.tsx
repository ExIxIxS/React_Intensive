import { useState } from 'react';
import { CategoryProps, ItemProps, TableProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

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
        <td>Delete</td>
      </tr>
      {isExpanded &&
        props.data.items &&
        props.data.items.map((item) => <TableItem key={item.id} data={item} />)}
    </>
  );
}

function TableItem(props: ItemProps): JSX.Element {
  return (
    <tr className={styles['table-item']}>
      <td>{props.data.name}</td>
      <td>Checkbox</td>
      <td>{props.data.description}</td>
      <td>Delete</td>
    </tr>
  );
}

export default Table;
