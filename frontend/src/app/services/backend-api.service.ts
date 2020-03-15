import { Injectable } from '@angular/core';

import { Book } from './../book.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  
  private books: Book[] = [];
  private booksUpdate = new Subject<Book[]>();
  
  constructor(private http: HttpClient) {}
  
  getBooks() {
    this.http
      .get<{ message: string; books: any}>(
        "http://localhost:3000/api/books"
      )
      .pipe(map((postData) => {
        return postData.books.map(post => {
          return {
            title: post.title,
            price: post.price,
            id: post.id,
            author: post.author
          };
        });
      }))
      .subscribe(data => {
        this.books = data;
        this.booksUpdate.next([...this.books]);
      });
  }
  
  getBookUpdateListener() {
    return this.booksUpdate.asObservable();
  }
  
  postBook(title: string, price: number, author: string) {
    const post: Book = {id: null, title: title, price: price, author: author};
    // const post: Book = {id: null, title: "new book5", price: 123, author: "liu123"};

    this.http
      .post<{ message: string, postId: string}>("http://localhost:3000/api/books", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.books.push(post);
        this.booksUpdate.next([...this.books]);
      })
  }
}
