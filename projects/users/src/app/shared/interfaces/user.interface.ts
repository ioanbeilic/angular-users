export interface IUser {
  id: number;
  name: string;
  alias: string;
  email: string;
  departments: string[];
  privileges: string[];
  userType: string;
  status: boolean;
  deleted?: boolean;
  date: Date;
}
