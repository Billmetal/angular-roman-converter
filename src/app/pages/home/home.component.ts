import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, Subject, takeUntil } from 'rxjs';
import { ConverterService } from 'src/app/share/services/converter/converter.service';
import { DataShareService } from 'src/app/share/services/dataShare/data-share.service';
import { DataReceiver, DataSender } from 'src/app/share/services/models/convert-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {  

  title!: string;
  placeholder!: string;
  editType!: string; 
  result!: string;
  alert!: string;
  loading!: boolean;
  sender: DataSender = {
    number: 0,
    type: "",
    roman: ""
  };
  intext = '';

  private componentDestroyed$ = new Subject();

  constructor(private dataShare: DataShareService,private receiver: ConverterService) {
      
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next;
    this.componentDestroyed$.unsubscribe();
  }

  ngOnInit(): void {
    this.dataShare.homeSharedData.subscribe(data => {
      this.title = data.title;
      this.placeholder = data.placeholder;
      this.editType = data.editType;
      this.sender.type = data.type;
      this.clearFields();
      this.loading = false;
    });
 }

 private clearFields(){
    this.result = "";
    this.alert = "";
    this.intext = "";
 }

 convert(){
    this.result = "";
    this.alert = "";
    this.loading = true;
    this.setSender(this.sender.type);
    this.receiver.getResponse(this.sender).pipe(takeUntil(this.componentDestroyed$)).subscribe({next : resp => 
      this.response(resp),error: err => {
        this.loading = false;
        this.alert = "Error de processamento , tente mais tarde !";}});
 }

 private setSender(type: string){
   switch(type){
      case "roman":
        this.sender.number = Number.parseInt(this.intext);
        break;
      case "arabic":
        this.sender.roman = this.intext;
        break; 
      default:
        this.sender.number = 0;
        this.sender.roman = "";
        break;   
   }
 }

 private response(data: DataReceiver){
    this.loading = false;
    if(data.hasError){
      this.alert = this.getError(data.errorMessages);
      this.intext = "";
      this.result = "";
    } else {
      this.alert = "";
      switch(this.sender.type){
        case "roman":
          this.result = data.romanNumeral;
          break;
        case "arabic":
          this.result = data.number.toString();
          break;
      } 
    }
 }

 private getError(error: any): any{
    if(error.numberError != null){
      return error.numberError;
    }
    if(error.typeError != null){
      return error.typeError;
    }
    if(error.romanError != null){
      return error.romanError;
    }
 }

}
