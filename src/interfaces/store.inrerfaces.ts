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

export type { DeviceType, Resolution, MediaQuery, MediaQueryState };
