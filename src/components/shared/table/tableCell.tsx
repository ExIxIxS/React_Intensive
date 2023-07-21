import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from 'src/store';
import { selectTableActiveCell } from 'src/store/features/tableDataSlice';
import {
  getCellClassName,
  getSaveInputAction,
  getToogleCheckboxAction,
  isArrowKeyType,
  isCellActive,
} from 'src/components/shared/table/tableUtils';

import {
  ActiveCell,
  KeyArrowType,
  MoveDirectionType,
  TableCellProps,
} from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';
import { RowItemBasicPayload } from 'src/interfaces/store.inrerfaces';

function TableCell(props: TableCellProps): JSX.Element {
  const activeCell = useSelector(selectTableActiveCell);
  const dispatch = useDispatch<AppDispatch>();
  const cellRef = useRef<HTMLTableCellElement>(null);

  const [isInputEdited, setIsInputEdited] = useState(false);
  const [isInputDirty, setIsInputDirty] = useState(false);
  const [inputValue, setInputValue] = useState('');

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

  useEffect(() => {
    if (cellRef.current && !isInputEdited && isInputDirty) {
      cellRef.current.focus();
    }
  }, [isInputEdited]);

  useEffect(() => {
    if (inputValue) {
      console.log('input value -->', inputValue);
      saveInputToStore(inputValue);
    }
  }, [inputValue]);

  const saveInputToStore = (inputValue: string): void => {
    const action = getSaveInputAction(props, inputValue);

    if (action) {
      dispatch(action);
    }
  };

  const toogleCheckbox = (): void => {
    const action = getToogleCheckboxAction(props);

    if (action) {
      dispatch(action);
    }
  };

  const deleteItem = () => {
    let action: PayloadAction<string> | PayloadAction<RowItemBasicPayload> = {
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

  const handleKeyDown = (event: KeyboardEvent): void => {
    console.log('Cell handler!!!');

    if (event.key === 'Enter') {
      console.log('Cell Enter!');
      if (!isInputDirty) {
        setIsInputDirty(true);
      }
      handleEnter();
    }

    if (event.key.includes('Tab')) {
      const moveToNextAction: PayloadAction<MoveDirectionType> = {
        type: 'tableData/moveActiveCell',
        payload: 'next',
      };

      dispatch(moveToNextAction);
    }

    if (event.key.includes('Arrow')) {
      handleArrow(event.key);
    }
  };

  const handleEnter = (): void => {
    switch (props.type) {
      case 'checkbox': {
        toogleCheckbox();
        break;
      }
      case 'delete': {
        break;
      }
      case 'category name':
      case 'name':
      case 'description': {
        if (!isInputEdited) {
          setInputValue(props.text ?? '');
        }

        setIsInputEdited(!isInputEdited);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleArrow = (keyArrowType: string): void => {
    if (isArrowKeyType(keyArrowType)) {
      const validKeyArrowType = keyArrowType as KeyArrowType;

      const action: PayloadAction<MoveDirectionType> = {
        type: 'tableData/moveActiveCell',
        payload: validKeyArrowType.replace('Arrow', '').toLowerCase() as MoveDirectionType,
      };

      dispatch(action);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleCellClick = (e: MouseEvent<HTMLElement>): void => {
    if (e.target instanceof HTMLElement && e.target.tagName.toLowerCase() !== 'input') {
      setCellActive();
    }
  };

  const handleCellBlur = (): void => {
    setIsInputEdited(false);
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
          <input
            type="checkbox"
            checked={props.isChecked}
            onClick={toogleCheckbox}
            tabIndex={0}
            readOnly
          />
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
        const textCellContent = isInputEdited ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleCellBlur}
            autoFocus
          />
        ) : (
          <span>{props.text ?? ''}</span>
        );

        cellContent = (
          <>
            {textCellContent}
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
      if (typeof props.text === 'string') {
        cellContent = isInputEdited ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleCellBlur}
            autoFocus
          />
        ) : (
          <span>{props.text}</span>
        );
      }
      break;
    }
  }

  return (
    <td
      className={getCellClassName(activeCell, props.rowIndex, props.columnIndex)}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
      onFocus={() => console.log('Cell focused')}
      ref={cellRef}
      tabIndex={0}
    >
      {cellContent}
    </td>
  );
}

export default TableCell;