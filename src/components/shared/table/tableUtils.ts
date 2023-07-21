import { PayloadAction } from '@reduxjs/toolkit';
import { ActiveCell, TableCellProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';
import {
  CategoryBasicPayload,
  CategoryTextPayload,
  RowItemBasicPayload,
  RowItemTextPayload,
} from 'src/interfaces/store.inrerfaces';

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

function getSaveInputAction(
  cellProps: TableCellProps,
  inputValue: string
): PayloadAction<CategoryTextPayload | RowItemTextPayload> | undefined {
  switch (cellProps.type) {
    case 'category name': {
      return {
        type: 'tableData/setCategoryName',
        payload: {
          categoryId: cellProps.categoryId,
          text: inputValue,
        },
      };
    }
    case 'name': {
      if (cellProps.rowId) {
        return {
          type: 'tableData/setRowItemName',
          payload: {
            categoryId: cellProps.categoryId,
            itemId: cellProps.rowId,
            text: inputValue,
          },
        };
      }

      return;
    }
    case 'description': {
      return cellProps.rowId
        ? {
            type: 'tableData/setRowItemDescription',
            payload: {
              categoryId: cellProps.categoryId,
              itemId: cellProps.rowId,
              text: inputValue,
            },
          }
        : {
            type: 'tableData/setCategoryDescription',
            payload: {
              categoryId: cellProps.categoryId,
              text: inputValue,
            },
          };
    }

    default:
      return;
  }
}

function getToogleCheckboxAction(
  cellProps: TableCellProps
): PayloadAction<CategoryBasicPayload | RowItemBasicPayload> {
  return cellProps.rowId
    ? {
        type: 'tableData/toggleRowItemCheckbox',
        payload: {
          categoryId: cellProps.categoryId,
          itemId: cellProps.rowId,
        },
      }
    : {
        type: 'tableData/toggleCategoryCheckbox',
        payload: {
          categoryId: cellProps.categoryId,
        },
      };
}

export {
  isCellActive,
  getCellClassName,
  isArrowKeyType,
  getSaveInputAction,
  getToogleCheckboxAction,
};
