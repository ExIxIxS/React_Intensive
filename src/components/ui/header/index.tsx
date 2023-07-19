import Navbar from 'src/components/shared/navbar';
import AppLogo from '../appLogo';
import AuthMenu from '../authMenu';
import { getNavDataItems } from 'src/utils/navigationFunctions';

import styles from 'src/components/ui/header/header.module.scss';
import { useSelector } from 'react-redux';
import { selectDiviceType } from 'src/store/features/mediaQuerySlice';
import NavDropDownMenu from 'src/components/shared/navDropDownMenu';

function Header(): JSX.Element {
  const deviceType = useSelector(selectDiviceType);
  const isMobile = deviceType === 'mobile';

  return (
    <header className={styles.header}>
      {isMobile && (
        <NavDropDownMenu
          navData={getNavDataItems()}
          iconSrc="src/assets/icons/menu.png"
          position="left"
        />
      )}
      <AppLogo />
      {!isMobile && <Navbar navData={getNavDataItems()} />}
      <AuthMenu />
    </header>
  );
}

export default Header;
