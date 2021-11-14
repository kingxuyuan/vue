/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */

interface ActivityBannerItem {
    belong_area: string;
    click_num: number;
    id: number;
    linkType: number;
    pic: string;
    title: string;
    type: number;
    url: string;
}

interface ActivityListItem {
    belong_area: string;
    click_num: number;
    id: number;
    linkType: number;
    pic: string;
    title: string;
    type: number;
    url: string;
}

interface ActivesTopItem {
    belong_area: string;
    click_num: number;
    id: number;
    linkType: number;
    pic: string;
    title: string;
    type: number;
    url: string;
}
interface ActivesUnderItem {
    belong_area: string;
    click_num: number;
    id: number;
    linkType: number;
    pic: string;
    title: string;
    type: number;
    url: string;
}

export interface ActiveButtonPopupAdsItem {
    id: number;
    pic: string;
    url: string;
    title: string;
}

export interface ActivePopupAdItem {
    id: number;
    pic: string;
    url: string;
}

export interface ActiveDataType {
    activity_banner: ActivityBannerItem[];
    activity_list: ActivityListItem[];
    s_top: ActivesTopItem[];
    s_under: ActivesUnderItem[];
    button_popup_ads: ActiveButtonPopupAdsItem[];
    popup_ad: ActivePopupAdItem[];
}
