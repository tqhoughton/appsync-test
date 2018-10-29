// eslint-disable
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag'

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
  }
}
`;
export const listPosts = gql`query ListPosts(
  $filter: TablePostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
    }
    nextToken
  }
}
`;
