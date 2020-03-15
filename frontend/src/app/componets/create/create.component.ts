import { Component, OnInit } from '@angular/core';
import { BackendApiService } from './../../services/backend-api.service';
import { NgForm, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  

  constructor(
    private service: BackendApiService,
  ) {}

  ngOnInit(): void {}
  
  onAddPost(form: NgForm) {
    console.log(form.value.title, form.value.price, form.value.author);
    this.service.postBook(form.value.title, form.value.price ,form.value.author);
    form.resetForm();
  } 
}
