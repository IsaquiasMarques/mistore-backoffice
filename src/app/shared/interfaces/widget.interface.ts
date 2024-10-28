import { WidgetPercentageStatusEnum } from "@shared/Enums/widget-percentage-status.enum"
import { SVGRefEnum } from "@shared/Enums/svg-ref.enum"

interface ISvgIcon{
  visible?: boolean,
  ref: SVGRefEnum,
  color: string
}

export interface IWidget{
    backgroundColor: string,
      ctaDotsColor: string,
      mainTextColor: string,
      footerTextColor: string,
      svgIcon: ISvgIcon,
      headerLabel: string,
      view_data: boolean,
      data: {
        main: number,
        percentageStatus: WidgetPercentageStatusEnum,
        percentageValue: number,
        footerLabelValue: number,
        footerLabelText: string
      }
}