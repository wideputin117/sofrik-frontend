export type Role ="ADMIN" | "USER";

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isEmailVerified: boolean;
  isVerified: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
}

export interface InitialState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface Paginate {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[];
}
