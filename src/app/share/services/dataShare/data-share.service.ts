import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeDataShare } from '../models/home-data-share.model';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private homeDataShare!: HomeDataShare;
  private homeData = new BehaviorSubject<HomeDataShare>(this.homeDataShare);
  homeSharedData = this.homeData.asObservable();

  constructor() { }

  updateHomeData(data: HomeDataShare){
    this.homeData.next(data);
  }

}
