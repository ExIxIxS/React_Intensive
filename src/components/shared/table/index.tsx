import CategoryRow from 'src/components/shared/table/categoryRow';

import { TableProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

function Table(props: TableProps): JSX.Element {
  let nextCategoryIndex = 0;

  return (
    <table className={styles['table']}>
      <thead className={styles['table-header']}>
        <tr className={styles['table-row']}>
          <th className={styles['cell']}>Name</th>
          <th className={styles['cell']}>Checkbox</th>
          <th className={styles['cell']}>Description</th>
          <th className={styles['cell']}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((category) => {
            const item = (
              <CategoryRow key={category.id} data={category} rowIndex={nextCategoryIndex} />
            );

            nextCategoryIndex += category.items.length + 1;

            return item;
          })}
      </tbody>
    </table>
  );
}

export default Table;
