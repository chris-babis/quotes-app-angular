import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { UserService } from 'src/app/User/user.service';
import { Quote } from '../quote.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  categories = ["love","life","motivational","wisdom"];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onUpload(uploadForm: NgForm){

    const quote = new Quote(
      uploadForm.value.quote,
      uploadForm.value.author,
      uploadForm.value.category,
      this.userService.user.value,
      true
    );
    this.userService.uploadQuote(quote);
  }

}
