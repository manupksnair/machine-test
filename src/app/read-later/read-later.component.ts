import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css']
})
export class ReadLaterComponent implements OnInit {
  articleResults: any;

  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  showFirstLastButtons = true;

  constructor() { }

  ngOnInit(): void {
    const data = this.getReadLaterContents();
    this.articleResults = data.slice(0, this.pageSize);
    this.length = data.length;
  }

  getReadLaterContents() {
    return localStorage.getItem('readLater') ? JSON.parse(localStorage.getItem('readLater') || ""): [];
  }

  removeFromList(index: number): void {
    const results = this.getReadLaterContents();
    results.splice(index, 1);
    localStorage.setItem('readLater', JSON.stringify(results));
    this.articleResults = results;
    alert("Article removed from list");
  }

  handlePageEvent(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.articleResults = this.getReadLaterContents().slice(this.pageSize * this.pageIndex, (this.pageSize * this.pageIndex) + 10);
  }

}
