import { Component, OnInit } from '@angular/core';
import { GifUrl } from 'src/assets/gifUrl.model';
import { GiphyService } from '../service/giphy.service';

@Component({
  selector: 'app-user-gif',
  templateUrl: './user-gif.component.html',
  styleUrls: ['./user-gif.component.scss']
})
export class UserGifComponent implements OnInit {

  searchInput : string = '';
  message: string = '';
  gifData: any[] = [];
  gifUrl: GifUrl[] = [];
  limitData: number[] = [10,20,30,40,50];
  defaultLimit = this.limitData[0];
  addGif= new Array<GifUrl>();
  isAscending: boolean = true;

  constructor(private gs: GiphyService) { }

  ngOnInit(): void {
     this.getDataInStore();
  }

  /**
   * On Search Click get the results based on search input from giphy search api.
   */
  onSearchClick() : void {
    this.gs.searchGif(this.searchInput,this.defaultLimit).subscribe(res => {
      this.gifData = res.data;
      this.addGif = [];
      this.gifData.forEach((i:any) => {
        this.addGif.push({
          id: i.id,
          name:this.searchInput.toUpperCase(),
          url: i.images.original.url,
          date: new Date()
        })
     })

    })
  }

  /**
   *  On Click of Add Store , store images in localStorage.
   */
  addToStore(): void {
    // adding images to localStorage in random order so sorting can be visible.
    this.addGif = this.addGif.sort((a, b) => 0.5 - Math.random());

   localStorage.setItem(this.searchInput.toUpperCase(),JSON.stringify(this.addGif));
    this.getDataInStore();
    this.gifData = [];
    this.addGif=[];
    this.searchInput = '';
  }

  /**
   * Get Data from Local Storage
   */
  getDataInStore():void {
    this.gifUrl=[];
    this.checkDuplicates();
  }

  /**
   * Get All the data from localStorage in a single Array.
   * @returns 
   */
  getAllValuesFromLocalStorage(): Array<GifUrl> {
    let localStorageArr = new Array<GifUrl>();
        let newArr=new Array<GifUrl>();
        Object.values(localStorage).filter(key => {
          localStorageArr.push(JSON.parse(key))
        })
        localStorageArr.forEach((item:any) => {
        newArr.push(...item)
        })
      return newArr;
  }

  /**
   * Check for duplicates in localStorage and filter the same data based on id and dont show it in user-store.
   */
  checkDuplicates():void {
    let arr = this.getAllValuesFromLocalStorage();
    var a = arr.filter((v:any,i:any,a:any)=>a.findIndex((v2:any)=>(v2.id===v.id))===i)
    this.gifUrl = a;
  }
  /**
   * Filter the Data based on search Input
   * @param urlData 
   */
  getFilteredData(dataKey:any): void {
    if(localStorage.getItem(dataKey) !== null) {
      this.gifUrl = JSON.parse(localStorage.getItem(dataKey) || '')
    } else {
      this.message = `No Data Found!!! Please search from Giphy and Add in User Store. `
    }
  }

  /**
   * Get the original Data back on click of reset.
   */
  resetData():void {
    this.message = '';
    this.getDataInStore();
  }

  /**
   * Sort the Images by date.
   * @param data 
   */
  sortByDate():void {
    this.isAscending = !this.isAscending
    this.gifUrl.sort((a,b) =>{
      let dateA:any = new Date(a.date);
      let dateB:any = new Date(b.date);
      if(this.isAscending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    })
  }


}
