export interface ILeaderBoard {
  result: Result;
  userPosition: UserPosition;
}

export interface Result {
  data: UserPosition[];
  totalPages: number;
  totalElements: number;
  elementsPerPage: string;
}

export interface UserPosition {
  position: number;
  userId: string;
  username: string;
  location: null;
  points: number;
}
