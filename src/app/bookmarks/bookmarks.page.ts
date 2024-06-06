import { Component } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: 'bookmarks.page.html',
  styleUrls: ['bookmarks.page.scss'],
})
export class BookmarksPage {
  selectedBookmarksSegment: string = 'bookmarksArticles';

  bookmarksSegmentChanged(event: any) {
    this.selectedBookmarksSegment = event.detail.value;
  }
}
