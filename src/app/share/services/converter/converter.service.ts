import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataReceiver, DataSender } from '../models/convert-data.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  private url: string = "https://roman-to-arabic-converter.herokuapp.com/converter";

  constructor(private http: HttpClient) { }

  getResponse(sender: DataSender): Observable<DataReceiver> {
    return this.doPost(sender);
  }

  private doPost<DataSender>(bd: DataSender): Observable<DataReceiver> {
    return this.http.post<DataReceiver>(this.url,bd,{});
  }
}
