export interface User{
  id?: string ;   //新增的时候是没有id的，设置为可选
  email: string;
  password: string;
  name: string;
  avatar: string;
}
