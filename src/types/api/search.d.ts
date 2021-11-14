interface listItem {
    title: string;
}

export interface ResponseSearchType {
    list: listItem[];
}

export interface RequestTypes {
    keywords: string;
    page: number;
}

export interface RequestSearchKeyWordsTypes {
    params: RequestTypes;
    callback: (any) => void;
}

interface tags_item_types {
    title: string;
}
export interface movies_item_types {
    click_num: number;
    click_num_str: string;
    cover: string;
    create_time: string;
    gif: string;
    id: number;
    is_buy: number;
    is_discount: number;
    price: string;
    score: string;
    tag_ids: string;
    tags: [];
    title: string;
    type: number;
}
export interface ResponseSearchKeyWordsTypes {
    movie_count: number;
    movies: movies_item_types[];
}
