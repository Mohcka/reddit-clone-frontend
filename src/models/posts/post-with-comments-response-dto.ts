import { PostModel } from "../post-model";
import { CommentModel } from "../comment-model";

export interface PostWithCommentsResponseDTO {
  post: PostModel;
  comments: CommentModel[];
}