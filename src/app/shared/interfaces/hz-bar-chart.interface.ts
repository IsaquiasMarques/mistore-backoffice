interface chartSerie{
    name: string,
    color: string,
    data: number[]
}

export interface HorizontalBarChart{
    details?: {
        title: string,
        description: string,
        chartUnity: string,
        toolpit: boolean
    },
    labels: string[],
    series: chartSerie[]
}