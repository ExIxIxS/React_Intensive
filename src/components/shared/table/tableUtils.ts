import { PayloadAction } from '@reduxjs/toolkit';

import { tableDataActions } from 'src/store/features/tableDataSlice';

import { ActiveCell, TableCellProps } from 'src/components/shared/table/table.interfaces';

import {
  CategoryBasicPayload,
  CategoryTextPayload,
  RowItemBasicPayload,
  RowItemTextPayload,
} from 'src/interfaces/store.inrerfaces';

import styles from 'src/components/shared/table/table.module.scss';

function isCellActive(cell: ActiveCell, activeCell: ActiveCell) {
  return cell.row === activeCell.row && cell.column === activeCell.column;
}

function getCellClassName(activeCell: ActiveCell, rowIndex: number, columnIndex: number): string {
  const checkboxColumnIndex = 1;
  const deleteColumnIndex = 3;

  const activeClassName =
    activeCell.row === rowIndex && activeCell.column === columnIndex ? styles['cell--active'] : '';

  const checkBoxClassName = columnIndex === checkboxColumnIndex ? styles['cell--checkbox'] : '';

  const deleteClassName = columnIndex === deleteColumnIndex ? styles['cell--delete'] : '';

  return `${styles['cell']} ${activeClassName} ${checkBoxClassName} ${deleteClassName}`;
}

function isArrowKeyType(type: string): boolean {
  const arrowTypes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  return arrowTypes.includes(type);
}

function getSaveInputAction(
  cellProps: TableCellProps,
  inputValue: string
): PayloadAction<CategoryTextPayload | RowItemTextPayload> | undefined {
  switch (cellProps.type) {
    case 'category name': {
      const payload = {
        categoryId: cellProps.categoryId,
        text: inputValue,
      };

      return tableDataActions.setCategoryName(payload);
    }
    case 'name': {
      if (cellProps.rowId) {
        const payload = {
          categoryId: cellProps.categoryId,
          itemId: cellProps.rowId,
          text: inputValue,
        };

        return tableDataActions.setRowItemName(payload);
      }

      return;
    }
    case 'description': {
      if (cellProps.rowId) {
        const payload = {
          categoryId: cellProps.categoryId,
          itemId: cellProps.rowId,
          text: inputValue,
        };

        return tableDataActions.setRowItemDescription(payload);
      }

      const payload = {
        categoryId: cellProps.categoryId,
        text: inputValue,
      };

      return tableDataActions.setCategoryDescription(payload);
    }

    default:
      return;
  }
}

function getToogleCheckboxAction(
  cellProps: TableCellProps
): PayloadAction<CategoryBasicPayload | RowItemBasicPayload> {
  if (cellProps.rowId) {
    const payload = {
      categoryId: cellProps.categoryId,
      itemId: cellProps.rowId,
    };

    return tableDataActions.toggleRowItemCheckbox(payload);
  }

  const payload = {
    categoryId: cellProps.categoryId,
  };

  return tableDataActions.toggleCategoryCheckbox(payload);
}

export {
  isCellActive,
  getCellClassName,
  isArrowKeyType,
  getSaveInputAction,
  getToogleCheckboxAction,
};
