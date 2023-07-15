import { NavLink } from 'react-router-dom';

import { NavData } from 'src/interfaces/navData.interfaces';
import styles from 'src/components/shared/navbar/navbar.module.scss';

function Navbar(props: { navData: NavData }): JSX.Element {
  return (
    <nav className={styles.navbar}>
      {props.navData.map((navDataItem) => {
        return (
          <NavLink
            key={navDataItem.id}
            to={navDataItem.path}
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.isActive : ''}`}
          >
            {navDataItem.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default Navbar;
