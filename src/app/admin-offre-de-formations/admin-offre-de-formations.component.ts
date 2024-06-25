import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { FormationsData } from '../formations-data';

@Component({
  selector: 'app-admin-offre-de-formations',
  templateUrl: './admin-offre-de-formations.component.html',
  styleUrls: ['./admin-offre-de-formations.component.scss']
})
export class AdminOffreDeFormationsComponent {

  displayedColumns: string[] = ['Title', 'Date','Action'];
  dataSource: MatTableDataSource<FormationsData> = new MatTableDataSource<FormationsData>([]);;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  showFormationsList:boolean = false;
  showFormationInfo:boolean = false;

  lcRow:FormationsData | undefined;
  selectedFormation:any={
    Title:'default',
    Date:'default',
    Action:'...'
  };


  constructor(){
     // Create 100 users
     const formations = Array.from({length: 100}, (_, k) => this.createNewFormation(k + 1));

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

  noteLastClickedRow(r:FormationsData){
    this.lcRow = r;
    console.log(this.lcRow);
    this.selectedFormation.Title = r.Title;
    this.selectedFormation.Date = r.Date;
  }

  changePanel(n:number){
    if(n==1){
      this.showFormationsList = true;
      this.showFormationInfo = false;
    }else{
      this.showFormationInfo=true;
      this.showFormationsList = false;
    }
  }

  createNewFormation(id: number): FormationsData {
    const name = "default formation in default"
  
    return {
      Title: name,
      Date: Math.round(Math.random() * 100).toString(),
      Action:'...'
    };
  }
}
