import { IMenuIconRef } from "@shared/interfaces/icon-ref.interface";
import { BadgeColorEnum } from "../Enums/badge.enum";

export interface IMenuItemBadge{
    label: string,
    color: BadgeColorEnum
}

export interface ISidebarItems{
    icon: IMenuIconRef,
    label: string,
    routeTo: string,
    active: boolean,
    bagde?: IMenuItemBadge
}

export interface ISidebar{
    fieldset: string,
    items: ISidebarItems[]
}