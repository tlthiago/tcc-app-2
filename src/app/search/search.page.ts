import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  selectedSegment: string = 'articles';

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

}
