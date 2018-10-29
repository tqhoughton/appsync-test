// eslint-disable
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag'

export const createPost = gql`mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
  }
}
`;
export const deletePost = gql`mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
  }
}
`;
