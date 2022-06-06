export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    'avatarUrl': string,
    id: number,
    'isPro': boolean,
    name: string
  }
};

export type NewComment = {
  offerId: number,
  comment: string,
  rating: number
};
