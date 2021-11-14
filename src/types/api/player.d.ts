// 视频详情请求类型
export interface PlayerRequestType {
    id: string;
}
// 猜你喜欢请求类型
export interface GuessLikeRequesr {
    id: string;
    page: number;
}
// 观看次数、电影购买 请求类型
export interface MovieBuyOrWatchRequestType {
    movie_id: number;
}

export interface PlayEndParams {
    id: number;
    start_time: number;
    end_time: number;
}

interface middle_adv_type {
    click_num: number;
    id: number;
    linkType: number;
    pic: string;
    title: string;
    type: number;
    url: string;
}

interface top_adv_types {
    pic: string;
    url: string;
}
// 视频详情返回类型
export interface ResponsePlayerType {
    click_num_str: string;
    cover: string;
    create_time: string;
    id: number;
    is_buy: number;
    middle_adv: middle_adv_type;
    number: string;
    price: string;
    title: string;
    top_adv: top_adv_types;
    type: number;
    url: string;
    definition: {
        low: string;
        mid: string;
        up: string;
    };
}

interface tags_item {
    id: number;
    title: string;
}
export interface ListItem {
    cover: string;
    gif: string;
    id: number;
    is_buy: number;
    price: string;
    title: string;
    type: number;
}
// 猜你喜欢返回类型
export interface ResponseGuessLikeType {
    list: ListItem[];
}

// 观看次数返回类型
export interface ResponseAddPlay {
    re_today_view_times: number;
}

// 购买电影
export interface ResponseBuyMoive {
    movie_code: number;
    msg: string;
}
