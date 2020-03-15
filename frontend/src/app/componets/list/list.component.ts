import { Book } from './../../book.model';
import { BackendApiService } from './../../services/backend-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  
  books: Book[] = [];
  private booksSub : Subscription;
  
  constructor(
    private service: BackendApiService
  ) { }

  ngOnInit(): void {
    this.service.getBooks();
    this.booksSub = this.service.getBookUpdateListener()
      .subscribe((data : Book[]) => {
        this.books = data;
      })
  }
  
  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }

}
