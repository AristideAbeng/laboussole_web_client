import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { VoyagesEtudesData } from '../voyage-etudes-data';

@Component({
  selector: 'app-adminvoyages-etudes',
  templateUrl: './adminvoyages-etudes.component.html',
  styleUrls: ['./adminvoyages-etudes.component.scss']
})
export class AdminvoyagesEtudesComponent { 
  displayedColumns: string[] = ['Title', 'Date','Action'];
  dataSource: MatTableDataSource<VoyagesEtudesData> = new MatTableDataSource<VoyagesEtudesData>([]);;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  showVoyageEtudesList:boolean = false;
  showVoyageEtudeInfo:boolean = false;

  lcRow:VoyagesEtudesData | undefined;
  selectedVoyageEtude:any={
    Title:'default',
    Date:'default',
    Action:'...'
  };


  constructor(){
     // Create 100 users
     const formations = Array.from({length: 100}, (_, k) => this.createNewVoyageEtude(k + 1));

     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(formations);
    this.changePanel(1);
    console.log(formations)

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  noteLastClickedRow(r:VoyagesEtudesData){
    this.lcRow = r;
    console.log(this.lcRow);
    this.selectedVoyageEtude.Title = r.Title;
    this.selectedVoyageEtude.Date = r.Date;
  }

  changePanel(n:number){
    if(n==1){
      this.showVoyageEtudesList = true;
      this.showVoyageEtudeInfo = false;
    }else{
      this.showVoyageEtudeInfo=true;
      this.showVoyageEtudesList = false;
    }
  }

  createNewVoyageEtude(id: number): VoyagesEtudesData {
    const name = "default voyage etude to study default in default"
  
    return {
      Title: name,
      Date: Math.round(Math.random() * 100).toString(),
      Action:'...'
    };
  }
}
