import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import IconButton from 'src/components/shared/iconButton';

import { IconButtonProps } from 'src/components/shared/iconButton/iconButton.interfaces';
import { NavDropDownMenuProps } from 'src/components/shared/navDropDownMenu/navDropDownMenu.interfaces';

import styles from 'src/components/shared/navDropDownMenu/navDropDownMenu.module.scss';

function NavDropDownMenu(props: NavDropDownMenuProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  const menuButtonProps: IconButtonProps = {
    iconSrc: props.iconSrc ?? 'src/assets/icons/react.png',
    alt: 'Menu Icon',
    handleClick: toggleMenu,
  };

  return (
    <div className={styles['menu']}>
      <IconButton {...menuButtonProps} />
      {isOpened && (
        <nav className={`${styles['menu-list']} ${styles[`menu-list--${props.position}`]}`}>
          {props.navData.map((navDataItem) => {
            return (
              <NavLink
                key={navDataItem.id}
                to={navDataItem.path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `${styles['menu-list-item']} ${isActive ? styles.isActive : ''}`
                }
              >
                {navDataItem.title}
              </NavLink>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default NavDropDownMenu;
