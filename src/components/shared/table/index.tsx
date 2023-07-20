import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'src/store';
import { selectTableActiveCell } from 'src/store/features/tableDataSlice';

import {
  ActiveCell,
  CategoryProps,
  ItemProps,
  KeyArrowType,
  MoveDirectionType,
  TableCellProps,
  TableProps,
} from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';
import { DeleteItemPayload } from 'src/interfaces/store.inrerfaces';
import { PayloadAction } from '@reduxjs/toolkit';

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
  return (
    <tr className={styles['table-item']}>
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

function TableCell(props: TableCellProps): JSX.Element {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const activeCell = useSelector(selectTableActiveCell);
  const dispatch = useDispatch<AppDispatch>();

  const deleteItem = () => {
    let action: PayloadAction<string> | PayloadAction<DeleteItemPayload> = {
      type: 'tableData/deleteCategory',
      payload: props.categoryId,
    };

    if (props.rowId) {
      action = {
        type: 'tableData/deleteItem',
        payload: { categoryId: props.categoryId, itemId: props.rowId },
      };
    }

    dispatch(action);
  };

  useEffect(() => {
    const cell = {
      row: props.rowIndex,
      column: props.columnIndex,
    };

    if (cellRef.current && isCellActive(cell, activeCell)) {
      console.log('Focus!');
      cellRef.current.focus();
    }
  }, [activeCell]);

  const handleKeyDown = (event: KeyboardEvent): void => {
    event.preventDefault();
    console.log('Cell handler!!!');

    if (event.key === 'Enter') {
      console.log('Cell Enter!');
    }

    if (event.key.includes('Arrow')) {
      handleArrow(event.key);
    }
  };

  const handleArrow = (keyArrowType: string): void => {
    if (isArrowKeyType(keyArrowType)) {
      const validKeyArrowType = keyArrowType as KeyArrowType;

      const action: PayloadAction<MoveDirectionType> = {
        type: 'tableData/moveActiveCell',
        payload: validKeyArrowType.replace('Arrow', '').toLowerCase() as MoveDirectionType,
      };

      console.log(action);

      dispatch(action);
    }
  };

  const handleCheckboxChange = (): void => {
    console.log('switch checkbox');
  };

  const setCellActive = (): void => {
    const action: PayloadAction<ActiveCell> = {
      type: 'tableData/setActiveCell',
      payload: {
        row: props.rowIndex,
        column: props.columnIndex,
      },
    };

    dispatch(action);
  };

  let cellContent: ReactNode;

  switch (props.type) {
    case 'checkbox': {
      if (typeof props.isChecked === 'boolean') {
        cellContent = (
          <input type="checkbox" checked={props.isChecked} onChange={handleCheckboxChange} />
        );
      }

      break;
    }
    case 'delete': {
      cellContent = (
        <button className={styles['delete-button']} onClick={deleteItem}>
          Delete
        </button>
      );
      break;
    }
    case 'category name': {
      if (typeof props.isExpanded === 'boolean' && typeof props.clickHandler === 'function') {
        cellContent = (
          <>
            <span>{props.text}</span>
            <button className={styles['expand-button']} onClick={props.clickHandler}>
              {props.isExpanded ? '-' : '+'}
            </button>
            <span>{props.itemsAmount ? `(${props.itemsAmount})` : ''}</span>
          </>
        );
      }

      break;
    }
    case 'name':
    case 'description':
    default: {
      if (props.text) {
        cellContent = props.text;
      }
      break;
    }
  }

  return (
    <td
      className={getCellClassName(activeCell, props.rowIndex, props.columnIndex)}
      onClick={setCellActive}
      onKeyDown={handleKeyDown}
      onFocus={() => console.log('Cell focused')}
      onBlur={() => console.log('Cell unfocused')}
      ref={cellRef}
      tabIndex={0}
    >
      {cellContent}
    </td>
  );
}

function isCellActive(cell: ActiveCell, activeCell: ActiveCell) {
  return cell.row === activeCell.row && cell.column === activeCell.column;
}

function getCellClassName(activeCell: ActiveCell, rowIndex: number, columnIndex: number): string {
  return activeCell.row === rowIndex && activeCell.column === columnIndex
    ? styles['active-cell']
    : '';
}

function isArrowKeyType(type: string): boolean {
  const arrowTypes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  return arrowTypes.includes(type);
}

export default Table;
