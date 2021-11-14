/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */

export interface VideoItemType {
    address: string;
    get_user_avatar: { avatar: string };
    get_user_video_heat_data: { like: string; comment: string };
    is_attention: number;
    is_like: number;
    join_long_video_id: number;
    join_long_video_img: string;
    join_long_video_title: string;
    nick_name: string;
    tag_ids: string;
    user_id: number;
    video_id: number;
    video_img: string;
    video_name: string;
    video_path: string;
    video_time: number;
}
export interface ShortVideoType {
    video: VideoItemType[];
}

export interface ShortVideoParamsType {
    page: number;
    size: number;
}

interface ShortVideoAdItemType {
    advertising: string;
    id: number;
    img_url: string;
    link: string;
    linkType: number;
    place: string;
    restriction: string;
    total: number;
}

export interface ShortVideoAdType {
    list: ShortVideoAdItemType[];
}

export interface ShortVideoAdTimeType {
    videoNum: number;
    isUser: string;
    is_update: number;
    is_comment: number;
}

export interface ShortVideoAdTimeParamsType {
    video_id: number;
}
