import { NavLink } from 'react-router-dom';

import { NavData } from 'src/interfaces';

interface NavbarProps {
  navData: NavData;
}

function Navbar(props: NavbarProps): JSX.Element {
  return (
    <nav className="navbar">
      {props.navData.map((navItem) => {
        return (
          <NavLink
            key={navItem.id}
            to={navItem.path}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            {navItem.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default Navbar;
