import { NavData } from 'src/components/shared/navbar/navbar.interfaces';

type MenuPositions = 'left' | 'center' | 'right';

interface NavDropDownMenuProps {
  navData: NavData;
  position: MenuPositions;
  iconSrc?: string;
}

export type { NavDropDownMenuProps, MenuPositions };
