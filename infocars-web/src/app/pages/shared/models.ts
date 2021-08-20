export interface Pageable<T> {
  total: number;
  limit: number;
  page: number;
  pages: number;
  data: Array<T>;
}

export interface User {
  _id: string;
  updatedAt: string;
  name: string;
  email: string;
  userName: string;
  lastName: string;
  createdAt: string;
}

export interface Car {
  _id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

export interface CarResponse {
  data: Car;
}

