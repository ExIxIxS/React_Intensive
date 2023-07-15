import { useState } from 'react';

import IconButton from 'src/components/shared/iconButton';

import { IconButtonProps } from 'src/components/shared/iconButton/iconButton.interfaces';
import {
  DropDownMenuProps,
  DropDownMenuPropsItem,
} from 'src/components/shared/dropDownMenu/dropDownMenu.interfaces';

import styles from 'src/components/shared/dropDownMenu/dropDownMenu.module.scss';

function DropDownMenu(props: DropDownMenuProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  const menuButtonProps: IconButtonProps = {
    iconSrc: 'src/assets/icons/react.png',
    alt: 'Menu Icon',
    handleClick: toggleMenu,
  };

  const getItemClickHandler = (itemData: DropDownMenuPropsItem) => {
    return () => {
      itemData.clickHandler();
      toggleMenu();
    };
  };

  return (
    <div className={styles['menu']}>
      <IconButton {...menuButtonProps} />
      {isOpened && (
        <ul className={`${styles['menu-list']} ${styles[`menu-list--${props.position}`]}`}>
          {props.menuItems.map((itemData) => {
            return (
              <li
                key={itemData.id}
                className={styles['menu-list-item']}
                onClick={getItemClickHandler(itemData)}
              >
                {itemData.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropDownMenu;
