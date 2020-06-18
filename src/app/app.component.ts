import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AttestationService } from 'src/app/services/attestation.service';
import html2canvas from 'html2canvas';
import localeFr from '@angular/common/locales/fr';
import * as jsPDF from 'jspdf';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //@ViewChild('htmlData', {static: false}) htmlData:ElementRef;
  //@ViewChild('pdfTogenerate', {static: false}) pdfTogenerate:ElementRef;
      // tslint:disable: quotemark
      // tslint:disable: object-literal-key-quotes
  private DataAttest:any;
  private isOkey:boolean = false;
  private showAttest:boolean = false;
  private stateCompletion:boolean = false;
  private StateCompletionAlertClosed:boolean = false;
  private NullDataAlertClosed:boolean = false;
  private showStartBotton:boolean = true;
  private code:number = 11111111;
  private nbrTelechargement = 2;
  private currentAttestation:any;
  
  Students = [
    {
      "id": 434,
      "codeEtudiant":11111111,
      "nomComplet": "EL RHOMARI HICHAM",
      "cin": "JK31566",
      "cne": "D133818258",
      "date_naissance": "1998-05-16",
      "ville_naissance": "AGADIR",
      "annee_session": "2019/2020",
      "type_diplome": "Fl. Ing. BDCC",
      "annee_univers": "2eme année Filière ING : BDCC",
      "nbr_telechargement": 2,
      "state_completion": false 
    }];

  todayDate = Date.now();

  constructor(private attestationService: AttestationService) { }
  ngOnInit(): void {
    //this.onGetAttestation(11111111);
  }

  public openPDF():void {
    window.scrollTo(0, 0);
    let data = document.getElementById("pdfTogenerate");
    html2canvas(data).then(canvas =>{
      const contentDataURL = canvas.toDataURL('image/png');
      window.open(contentDataURL);
    });
  } 

  public downloadPDF() {
    window.scrollTo(0, 0);
    let data = document.getElementById("pdfTogenerate");
    html2canvas(data).then(canvas =>{
      let pageWidth = 208;
      let imgWidth = 400;
      console.log(canvas);

      const contentDataURL = canvas.toDataURL('image/png');
      //window.open(contentDataURL);

      let pdf = new jsPDF('p','pt', 'a5');
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      let imgHeight = height * pageWidth / width ;
      pdf.addImage(contentDataURL, 'PNG', 0, 0 ,width, height);
      pdf.save('attestation.pdf');
      this.onUpdatenbrTelechargement(this.currentAttestation.id);
    }); 
  }

   /* public onGetAttestation(id:number) {
    this.attestationService.getAttestation(id).subscribe((data) => {
      this.DataAttest = Array (data);
      this.currentAttestation = data;
      console.log(this.currentAttestation);
      if(data == null) {
        this.showAttest = false;
        this.NullDataAlertClosed = true;
        setTimeout(() => this.NullDataAlertClosed = false, 6000);
      } else if(this.isStateComplete(this.DataAttest[0].nbr_telechargement)){
        this.showAttest = false;
        this.StateCompletionAlertClosed = true;
        setTimeout(() => this.StateCompletionAlertClosed = false, 6000);
      } else {
        this.isOkey = false;
        this.showAttest = true;
        this.showStartBotton = false;
      }
    },(err) => {
      console.error(err);
    });
  } */ 

  public onGetAttestation(id:number) {
    this.attestationService.getAttestation(id).subscribe((data) => {
      //this.DataAttest = Array (data);
      this.currentAttestation = data;
      console.log(this.currentAttestation);
      if(data == null) {
        this.showAttest = false;
        this.NullDataAlertClosed = true;
        setTimeout(() => this.NullDataAlertClosed = false, 6000);
      } else if(this.isStateComplete(this.currentAttestation.nbr_telechargement)){
        this.showAttest = false;
        this.StateCompletionAlertClosed = true;
        setTimeout(() => this.StateCompletionAlertClosed = false, 6000);
      } else {
        this.isOkey = false;
        this.showAttest = true;
        this.showStartBotton = false;
      }
    },(err) => {
      console.error(err);
    });
  }

  /* public onUpdateStateCompletion(id:number):void {
    this.DataAttest[0].state_completion = true;
    this.attestationService.updateAttestation(id,this.DataAttest[0])
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });;//
  }  */
  
  public onUpdateStateCompletion(id:number):void {
    this.currentAttestation.state_completion = true;
    this.attestationService.updateAttestation(id,this.currentAttestation)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });;//
  } 

  /* public onUpdatenbrTelechargement(id:number):void {
    --this.DataAttest[0].nbr_telechargement;
    console.log(this.DataAttest[0].nbr_telechargement);
    this.attestationService.updateAttestation(id,this.DataAttest[0])
    .subscribe(
      response => {
        this.showAttest = false;
        this.showStartBotton = true;
        console.log(response);
      },
      error => {
        console.log(error);
      });;//
  }  */

  public onUpdatenbrTelechargement(id:number):void {
    --this.currentAttestation.nbr_telechargement;
    console.log(this.currentAttestation.nbr_telechargement);
    this.attestationService.updateAttestation(id,this.currentAttestation)
    .subscribe(
      response => {
        this.showAttest = false;
        this.showStartBotton = true;
        console.log(response);
      },
      error => {
        console.log(error);
      });;//
  } 

  public isStateComplete(data): boolean {
    if(data == 0) {
      return true;
    }
    return false;
  }
}
