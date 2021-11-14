import { MoviesItemType } from '@/types/component/movieItem';

export interface IndexRequestParams {
    category_id: number;
    type_id: number;
    sub_category_id: number;
    product_id: number | string;
    page: number;
    row: number;
}
export interface RequestParamsType2 {
    id: number;
}

// tab type 为 1 时
export interface ResponseMoviesType1 {
    list: any[];
}

interface MoviesType2Item {
    data: Array<DataItem1 & DataItem2 & DataItem3 & DataItem4>;
    data1: Data1Item[];
    id: number;
    mx_showmore: number;
    pic_type: number;
    remark: string;
    title: string;
    type: number;
}

interface Data1Item {
    id: number;
    linkType: number;
    pic: string;
    title: string;
    url: string;
}

interface DataItem1 {
    belong_area: string;
    click_num: number;
    id: number;
    linkType: number;
    pic: string;
    title: string;
    type: number;
    url: string;
}
interface DataItem2 {
    cover: string;
    cover_vertical: string;
    duration: string;
    gif: string;
    id: number;
    is_buy: number;
    price: string;
    title: string;
    type: number;
    url: string;
    video_id: number;
}
interface DataItem3 {
    avatar: string;
    id: number;
    uname: string;
}

interface DataItem4 {
    id: number;
    linkType: number;
    msg: string;
    time: number;
    url: string;
}
// tab type 为 2 时
export interface ResponseMoviesType2 {
    list: MoviesType2Item[];
}
