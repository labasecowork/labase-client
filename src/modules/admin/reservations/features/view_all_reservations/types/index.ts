export interface Reservation {
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
  user: {
    first_name: string;
    last_name: string;
  };
  space: {
    name: string;
  };
}

export interface ReservationResponse {
  data: Reservation[];
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pages: number;
  prevPage: number | null;
  total: number;
}
