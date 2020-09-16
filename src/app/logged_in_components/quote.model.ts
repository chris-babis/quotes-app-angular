import { User } from '../User/user.model';

export class Quote {
  _id: string;
  quote: string;
  author: string;
  category: string;
  uploadedBy: User;
  awaiting: boolean

  constructor(quote: string, author:string, category:string,uploadedBy:User,awaiting:boolean){
    this.quote = quote;
    this.author = author;
    this.category = category;
    this.uploadedBy = uploadedBy;
    this.awaiting = awaiting;
  }
}
