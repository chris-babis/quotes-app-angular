export class User {
  _id?: string;
  username: string;
  password?: string;
  userRole?:string;
  token?: string;

  constructor (_id: string, username: string, userRole:string, token: string){
    this._id = _id;
    this.username = username;
    this.userRole = userRole;
    this.token = token;
  }

}
