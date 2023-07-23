import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from 'src/store';
import { selectTableActiveCell, tableDataActions } from 'src/store/features/tableDataSlice';
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
import { RowItemBasicPayload } from 'src/interfaces/store.inrerfaces';
import CellContent from './cellContent';

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

  const deleteItem = (): void => {
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
    if (event.key === 'Enter') {
      if (!isInputDirty) {
        setIsInputDirty(true);
      }
      handleEnter();
    }

    if (event.key.includes('Tab')) {
      const moveToNextActionPayload: MoveDirectionType = 'next';
      const moveToNextAction = tableDataActions.moveActiveCell(moveToNextActionPayload);

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
        deleteItem();
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
      const moveActionPayload: MoveDirectionType = validKeyArrowType
        .replace('Arrow', '')
        .toLowerCase() as MoveDirectionType;

      const moveAction = tableDataActions.moveActiveCell(moveActionPayload);

      dispatch(moveAction);
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
    const payload: ActiveCell = {
      row: props.rowIndex,
      column: props.columnIndex,
    };

    const action = tableDataActions.setActiveCell(payload);

    dispatch(action);
  };

  const cellContentProps = {
    tableProps: props,
    isInputEdited: isInputEdited,
    inputValue: inputValue,
    inputChangeHandler: handleInputChange,
    toogleCheckboxHandler: toogleCheckbox,
    deleteItemHandler: deleteItem,
    cellBlurHandler: handleCellBlur,
  };

  return (
    <td
      className={getCellClassName(activeCell, props.rowIndex, props.columnIndex)}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
      ref={cellRef}
      tabIndex={0}
    >
      <CellContent {...cellContentProps} />
    </td>
  );
}

export default TableCell;
