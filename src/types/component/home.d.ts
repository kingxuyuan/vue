import { ResponseMoviesType2 } from '../api/home';
import { MoviesItemType } from '@/types/component/movieItem';
import {
    ActiveButtonPopupAdsItem,
    ActivePopupAdItem,
} from '@/types/api/active';
export interface MovieType1 {
    page: number;
    type: any;
    refreshing: boolean;
    noResultText: string;
    loadingText: string;
}

export interface MovieType2 {
    dataInfo: ResponseMoviesType2;
}

export interface NoticesItem {
    content: string;
    show: boolean;
    title: string;
}

export interface PopupAdItem extends ActivePopupAdItem {
    show: boolean;
}

export interface OfficeNoticeDataType {
    notices: NoticesItem[];
    popupAd: PopupAdItem[];
    noticesShow: boolean;
    popupListShow: boolean;
}
