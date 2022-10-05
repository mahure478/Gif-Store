import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  @Input() gifData: any[] = [];
  searchIp: string = '';
  onSearchClick : boolean = false;
  @Output() filteredData = new EventEmitter<Array<object>>();
  @Output() sortedData = new EventEmitter<Array<object>>();
  @Output() resetSearch = new EventEmitter<Array<object>>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Filter gifs from localStorage and return the result based on search input.
   */
  searchInUserStore(): void {
    this.onSearchClick = true;
    let result:any = Object.keys(localStorage).filter(key => key == this.searchIp.toUpperCase())
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

}
