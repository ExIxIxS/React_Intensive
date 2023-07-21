import { useState } from 'react';

import TableCell from 'src/components/shared/table/tableCell';
import TableRow from 'src/components/shared/table/tableRow';

import { CategoryProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

function CategoryRow(props: CategoryProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const toogleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      <tr className={`${styles['table-item']} ${styles['category-item']}`}>
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
      {isExpanded &&
        props.data.items &&
        props.data.items.map((item, index) => (
          <TableRow
            key={item.id}
            categoryId={props.data.id}
            data={item}
            rowIndex={props.rowIndex + index + 1}
          />
        ))}
    </>
  );
}

export default CategoryRow;
