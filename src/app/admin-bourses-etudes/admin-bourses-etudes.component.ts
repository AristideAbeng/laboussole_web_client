import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { BourseEtudesData } from '../bourse-etudes-data';



@Component({
  selector: 'app-admin-bourses-etudes',
  templateUrl: './admin-bourses-etudes.component.html',
  styleUrls: ['./admin-bourses-etudes.component.scss']
})
export class AdminBoursesEtudesComponent {

  displayedColumns: string[] = ['Title', 'Date','Action'];
  dataSource: MatTableDataSource<BourseEtudesData> = new MatTableDataSource<BourseEtudesData>([]);;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  showBourseEtudesList:boolean = false;
  showBourseEtudeInfo:boolean = false;

  lcRow:BourseEtudesData | undefined;
  selectedBourse:any={
    Title:'default',
    Date:'default',
    Action:'...'
  };


  constructor(){
     // Create 100 users
     const formations = Array.from({length: 100}, (_, k) => this.createNewBourseEtude(k + 1));

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

  noteLastClickedRow(r:BourseEtudesData){
    this.lcRow = r;
    console.log(this.lcRow);
    this.selectedBourse.Title = r.Title;
    this.selectedBourse.Date = r.Date;
  }

  changePanel(n:number){
    if(n==1){
      this.showBourseEtudesList = true;
      this.showBourseEtudeInfo = false;
    }else{
      this.showBourseEtudeInfo=true;
      this.showBourseEtudesList = false;
    }
  }

  createNewBourseEtude(id: number): BourseEtudesData {
    const name = "default bourse to study default in default"
  
    return {
      Title: name,
      Date: Math.round(Math.random() * 100).toString(),
      Action:'...'
    };
  }
}
