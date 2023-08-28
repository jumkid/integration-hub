export interface APIResponse {
  status: number
  data: any | null
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
