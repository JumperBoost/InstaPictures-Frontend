import type {Media} from "~/types/Media";

export class Post {
    constructor(readonly code: string, readonly text: string, readonly date: number,
                readonly locationId: string, readonly locationName: string, readonly username: string,
                readonly fullname: string, readonly picUrl: string, readonly likeCount: string,
                readonly commentCount: string, readonly medias: Media[]) {}
}