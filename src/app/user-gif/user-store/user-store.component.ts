import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { GifUrl } from 'src/assets/gifUrl.model';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserStoreComponent {

  @Input() gifData: GifUrl[] = [];
  searchIp: string = '';
  onSearchClick: boolean = false;
  @Output() filteredData = new EventEmitter<GifUrl[]>();
  @Output() sortedData = new EventEmitter<void>();
  @Output() resetSearch = new EventEmitter<void>();

  /**
   * Filter gifs from localStorage and return the result based on search input.
   */
  searchInUserStore(): void {
    this.onSearchClick = true;
    const key = this.searchIp.toUpperCase();
    const stored = localStorage.getItem(key);
    const result: GifUrl[] = stored ? JSON.parse(stored) : [];
    this.filteredData.emit(result);
  }

  /**
   * Reset Search options.
   */
  reset(): void {
    this.onSearchClick = false;
    this.resetSearch.emit();
    this.searchIp = '';
  }

  /**
   *  Sort on Date.
   * @param data 
   */
  sortByDate(): void {
   this.sortedData.emit();
  }

  clearData(): void {
    localStorage.clear();
    this.reset();
  }

}
