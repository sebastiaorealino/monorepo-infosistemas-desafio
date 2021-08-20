export interface Login {
  password: string;
  email: string;
  role: string;
  confirmPassword: string;
}

export interface Test {
  email: string;
  role: string;
}

export interface SessionData {
  token: string;
  name: string;
  _id: string;
}

export interface Session {
  data: SessionData;
}

export interface Credential {
  email: string;
  name: string;
  password: string;
}
