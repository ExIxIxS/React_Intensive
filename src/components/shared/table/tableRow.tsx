import TableCell from 'src/components/shared/table/tableCell';

import { ItemProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

function TableRow(props: ItemProps): JSX.Element {
  return (
    <tr className={styles['table-row']}>
      <TableCell
        type="name"
        categoryId={props.categoryId}
        rowId={props.data.id}
        rowIndex={props.rowIndex}
        columnIndex={0}
        text={props.data.name}
      />
      <TableCell
        type="checkbox"
        categoryId={props.categoryId}
        rowId={props.data.id}
        rowIndex={props.rowIndex}
        columnIndex={1}
        isChecked={props.data.isChecked}
      />
      <TableCell
        type="description"
        categoryId={props.categoryId}
        rowId={props.data.id}
        rowIndex={props.rowIndex}
        columnIndex={2}
        text={props.data.description}
      />
      <TableCell
        type="delete"
        categoryId={props.categoryId}
        rowId={props.data.id}
        rowIndex={props.rowIndex}
        columnIndex={3}
      />
    </tr>
  );
}

export default TableRow;
