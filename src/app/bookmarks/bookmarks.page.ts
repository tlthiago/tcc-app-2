import { Component, OnInit } from '@angular/core';
import { IContent } from 'src/models/content.model';
import { BookmarksService } from '../services/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: 'bookmarks.page.html',
  styleUrls: ['bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {
  selectedBookmarksSegment: string = 'articles';
  contents: IContent[] = [];

  bookmarksSegmentChanged(event: any) {
    this.selectedBookmarksSegment = event.detail.value;
    this.getContents(this.selectedBookmarksSegment);
  }

  constructor(private bookmarksService: BookmarksService) {}

  ngOnInit() {
    this.getContents(this.selectedBookmarksSegment)
  }

  ionViewWillEnter() {
    this.getContents(this.selectedBookmarksSegment);
  }

  getContents(type) {
    this.bookmarksService.getContent(type).then(contents => {
      this.contents = contents;
    });
  }

  async unfavorite(id: string) {
    await this.bookmarksService.removeFromFavorites(id);
    this.getContents(this.selectedBookmarksSegment);
  }

}
