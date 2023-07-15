type MenuPositions = 'left' | 'center' | 'right';

interface DropDownMenuPropsItem {
  id: string;
  title: string;
  clickHandler: () => void;
}

interface DropDownMenuProps {
  menuItems: DropDownMenuPropsItem[];
  position: MenuPositions;
}

export type { DropDownMenuPropsItem, DropDownMenuProps, MenuPositions };
