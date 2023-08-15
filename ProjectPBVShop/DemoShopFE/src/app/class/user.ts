export interface Login {
    username: string;
    password: string;
  }
  export interface Register {
    username: string,
    email: string,
    full_name: string,
    phone: string,
    address: string,
    gender: string,
    birthday: Number,
    password: string,
    password_confirmation: string,
  }
  export interface User {
    username: string;
    email: string;
    full_name: string,
    phone: Number,
    address: string,
    gender: string,
    birthday: Number,
    password: string,
    password_confirmation: string,
    role: string,
  }