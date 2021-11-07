import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
query {
    getAllMessages {
      name
      message
      column
    }
  }
`;

export const POST_MESSAGE = gql`
mutation ($theUser: String!, $theMessage: String!, $theColumn: String!, $theLike: Int!) {
    postMessage(name: $theUser, message: $theMessage, column: $theColumn, like: $theLike)
  }
`

export const WATCH_MESSAGE = gql`
subscription {
  newMessages {
    _id 
    name 
    message
    date
    column,
    like
  }
}
`


export const REMOVE_MESSAGE = gql`
mutation ($id: ID!) {
  removeMessage(_id: $id)
}
`

export const REMOVE_All = gql`
mutation {
  removeAll
}
`

export const UPVOTE = gql`
mutation ($id: ID!,$like: Int) {
  upvote(id: $id,like: $like)
}
`

export const CHANGE = gql`
mutation ($id: ID!,$column: String!) {
  changeColumn(id: $id,column: $column)
}
`