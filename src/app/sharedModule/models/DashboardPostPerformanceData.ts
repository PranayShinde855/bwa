export interface DashboardPostPerformanceData {
    id: number,
    DataFor: string,
    data: GraphData[]
}

export interface GraphData {
    data: string,
    value: string
}