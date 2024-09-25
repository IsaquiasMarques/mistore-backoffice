import { WidgetPercentageStatusEnum } from "@shared/Enums/widget-percentage-status.enum"

export interface StatisticsData{
    main: number,
    percentageStatus: WidgetPercentageStatusEnum,
    percentageValue: number,
    footerLabelValue: number,
}