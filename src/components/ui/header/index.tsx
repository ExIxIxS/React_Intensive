import Navbar from 'src/components/shared/navbar';
import { getNavDataItems } from 'src/utils/navigationFunctions';

import styles from 'src/components/ui/header/header.module.scss';

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Navbar navData={getNavDataItems()} />
    </header>
  );
}

export default Header;
