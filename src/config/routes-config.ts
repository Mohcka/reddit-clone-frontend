export const RoutesConfig = {
  home: '/',
  posts: {
    create: '/post-create',
    edit: '/post-edit',
    show: '/show-post',
  },
  comments: {
    create: (postId: string = ':postId') => `/${postId}/comment-add`,
    edit: (id: string = ':id', postId: string = ':postId') =>
      `/post/${postId}/comment-edit/${id}`,
  },
}
