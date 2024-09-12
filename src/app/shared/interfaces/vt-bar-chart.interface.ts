interface chartSerie{
    name: string,
    color: string,
    data: number[]
}

export interface VerticalBarChart{
    details?: {
        title: string,
        description: string,
        chartUnity?: string,
        toolpit: boolean
    },
    labels: string[],
    series: chartSerie[]
}