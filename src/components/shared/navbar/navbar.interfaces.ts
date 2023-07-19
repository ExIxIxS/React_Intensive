interface NavInitDataItem {
  title: string;
  path: string;
}

interface NavDataItem extends NavInitDataItem {
  id: string;
}

type NavData = ReadonlyArray<NavDataItem>;

export type { NavInitDataItem, NavDataItem, NavData };
