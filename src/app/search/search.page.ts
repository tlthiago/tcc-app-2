import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { IContent } from 'src/models/content.model';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage implements OnInit {
  selectedSegment: string = 'articles';
  contents: IContent[] = [];

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.getContents(this.selectedSegment);
  }

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.getContents(this.selectedSegment)
  }

  getContents(type) {
    this.contentService.getContent(type).then(contents => {
      this.contents = contents;
    });
  }

  async favorite(id: string) {
    await this.contentService.addToFavorites(id);
    this.getContents(this.selectedSegment);
  }
}
