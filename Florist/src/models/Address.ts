export interface Address {
  code: number
  name: string
}

export interface Ward extends Address {}

export interface District extends Address {
  wards?: Array<Ward>
}

export interface City extends Address {
  districts?: Array<District>
}
