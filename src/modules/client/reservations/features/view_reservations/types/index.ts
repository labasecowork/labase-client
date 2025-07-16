export interface MyReservation {
  id: string;
  userId: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  people: number;
  fullRoom: boolean;
  codeQr: string;
  price: string;
  createdAt: string;
}

export interface MyReservationsResponse {
  data: MyReservation[];
  page: number;
  limit: number;
}
