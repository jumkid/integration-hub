export interface APIResponse {
  status: number
  data: any | null
}

export interface VehicleResponse {
  make:string
  model:string
  modelYear:number
  trimLevel:string
}

export interface VPICResultResponse {
  Value:string
  ValueId:string
  Variable:string
  VariableId:number
}

export interface VPICResponse {
  Count:number
  Message:string
  SearchCriteria:string
  Results:VPICResultResponse[]
}
