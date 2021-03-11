import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from './article.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  sidebarItems: any;
  articleContents: any;
  articleRepo: any;
  results: any;
  articleResults: any;

  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  showFirstLastButtons = true;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe(data => {
        this.articleContents = data
        this.articleResults = this.articleContents.results.slice(0, this.pageSize);
        this.length = this.articleContents.num_results;
      });
      
    this.articleService.getSections()
      .subscribe(data => {
        this.sidebarItems = data
        this.results = this.sidebarItems.results;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.articleService.getArticles().subscribe(data => {
      this.articleContents = data;
      this.articleResults = this.articleContents.results.slice(this.pageSize * this.pageIndex, (this.pageSize * this.pageIndex) + 10);
    })
  }

  searchArticles(section: string) {
    this.articleResults = this.articleContents.results.filter((article: { section: string; }) => article.section.toLowerCase() === section)
  }

  addToReadLater(article: string) {
    const readLater = localStorage.getItem('readLater');
    if(readLater) {
      const value = JSON.parse(readLater);
      value.push(article);
      localStorage.setItem('readLater', JSON.stringify(value));
      alert("Article added to list");
    } else {
      localStorage.setItem('readLater', JSON.stringify([article]));
      alert("Article added to list");
    }
  }

}
