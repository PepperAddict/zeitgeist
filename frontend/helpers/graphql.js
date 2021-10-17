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
mutation ($theUser: String!, $theMessage: String!, $theColumn: String!) {
    postMessage(name: $theUser, message: $theMessage, column: $theColumn)
  }
`

export const WATCH_MESSAGE = gql`
subscription {
  newMessages {
    _id 
    name 
    message
    date
    column
  }
}
`


export const REMOVE_MESSAGE = gql`
mutation ($id: ID!) {
  removeMessage(_id: $id)
}
`