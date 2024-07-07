export interface IJwtPayload {
  sub: string;
  type: any;
}

export interface ITCPPayload<T> {
  data: T;
  user: IJwtPayload;
}
