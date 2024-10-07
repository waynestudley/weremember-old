query ListMessages($userID: ID!) {
  listMessages(filter: { userID: { eq: $userID } }) {
    items {
      id
      content
      imageUrl
      createdAt
    }
  }
}