import { ActiveCell, CategoryData } from 'src/components/shared/table/table.interfaces';

type DeviceType = 'mobile' | 'desktop';

interface Resolution {
  width: number;
  heigth: number;
}

interface MediaQuery {
  deviceType: DeviceType;
  resolution: Resolution;
}

interface MediaQueryState {
  value: MediaQuery;
}

interface TableState {
  data: CategoryData[];
  activeCell: ActiveCell;
}

interface CategoryBasicPayload {
  categoryId: string;
}

interface CategoryTextPayload extends CategoryBasicPayload {
  text: string;
}

interface RowItemBasicPayload extends CategoryBasicPayload {
  itemId: string;
}

interface RowItemTextPayload extends RowItemBasicPayload {
  categoryId: string;
  itemId: string;
  text: string;
}

export type {
  DeviceType,
  Resolution,
  MediaQuery,
  MediaQueryState,
  TableState,
  CategoryBasicPayload,
  CategoryTextPayload,
  RowItemBasicPayload,
  RowItemTextPayload,
};
