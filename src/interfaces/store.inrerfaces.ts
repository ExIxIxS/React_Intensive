import { CategoryData } from 'src/components/shared/table/table.interfaces';

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

interface TableDataState {
  value: CategoryData[];
}

interface DeleteItemPayload {
  categoryId: string;
  itemId: string;
}

export type {
  DeviceType,
  Resolution,
  MediaQuery,
  MediaQueryState,
  TableDataState,
  DeleteItemPayload,
};
