import { ReactNode } from 'react';

import IconButton from 'src/components/shared/iconButton';

import { CellContentProps } from 'src/components/shared/table/table.interfaces';

import styles from 'src/components/shared/table/table.module.scss';

function CellContent(args: CellContentProps): ReactNode {
  switch (args.tableProps.type) {
    case 'checkbox': {
      if (typeof args.tableProps.isChecked === 'boolean') {
        return (
          <input
            type="checkbox"
            checked={args.tableProps.isChecked}
            onClick={args.toogleCheckboxHandler}
            tabIndex={0}
            readOnly
          />
        );
      }

      return;
    }
    case 'delete': {
      return (
        <IconButton
          iconSrc="src/assets/icons/trash.png"
          alt="delete button"
          handleClick={args.deleteItemHandler}
          size="medium"
        />
      );
    }
    case 'category name': {
      if (
        typeof args.tableProps.isExpanded === 'boolean' &&
        typeof args.tableProps.clickHandler === 'function'
      ) {
        const textCellContent = args.isInputEdited ? (
          <input
            type="text"
            value={args.inputValue}
            onChange={args.inputChangeHandler}
            onBlur={args.cellBlurHandler}
            autoFocus
          />
        ) : (
          <span>{args.tableProps.text ?? ''}</span>
        );

        return (
          <>
            <div className={styles['category-name-content']}>
              {textCellContent}
              <span>{args.tableProps.itemsAmount ? `(${args.tableProps.itemsAmount})` : ''}</span>
              <IconButton
                iconSrc={
                  args.tableProps.isExpanded
                    ? 'src/assets/icons/minus.png'
                    : 'src/assets/icons/plus.png'
                }
                alt="expand button"
                handleClick={args.tableProps.clickHandler}
                size="small"
              />
            </div>
          </>
        );
      }

      return;
    }
    case 'name':
    case 'description':
    default: {
      if (typeof args.tableProps.text === 'string') {
        return args.isInputEdited ? (
          <input
            type="text"
            value={args.inputValue}
            onChange={args.inputChangeHandler}
            onBlur={args.cellBlurHandler}
            autoFocus
          />
        ) : (
          <span>{args.tableProps.text}</span>
        );
      }

      return;
    }
  }
}

export default CellContent;
