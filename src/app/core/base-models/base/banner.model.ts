export interface BannerImages{
    imagePath: string,
    mobileImagePath?: string,
    tinyText?: string,
    mainTitle?: string,
    description?: string,
    routeTo?: string,
    button?: {
        TextColor: string,
        bgColor: string,
        content: string,
        iconColor: string,
        routeTo?: string
    }
}