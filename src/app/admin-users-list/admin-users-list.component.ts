import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataClass } from '../user-data-class';
import { UserData } from '../user-data-class';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements AfterViewInit {

  displayedColumns: string[] = ['Image', 'Title', 'Date', 'Id','Status','Action'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  
  showUsersList:boolean = false;
  showUserInfo:boolean = false;

  lcRow:UserData | undefined;
  selectedUser:any={
    Image:'default',
    Title:'default',
    Date:'default',
    Id:'default',
    Status:'default'
  };

  constructor(){
     // Create 100 users
     const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(users);
    this.changePanel(1);
    console.log(users)
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

  noteLastClickedRow(r:UserData){
    this.lcRow = r;
    console.log(this.lcRow);
    this.selectedUser.Title = r.Title;
    this.selectedUser.Image = r.Image;
    this.selectedUser.Status = r.Status;
    this.selectedUser.Date = r.Date;
    this.selectedUser.Id = r.Id;
  }

  changePanel(n:number){
    if(n==1){
      this.showUsersList = true;
      this.showUserInfo = false;
    }else{
      this.showUserInfo=true;
      this.showUsersList = false;
    }
  }

  createNewUser(id: number): UserData {
    const name =
      UserDataClass.NAMES[Math.round(Math.random() * (UserDataClass.NAMES.length - 1))] +
      ' ' +
      UserDataClass.NAMES[Math.round(Math.random() * (UserDataClass.NAMES.length - 1))].charAt(0) +
      '.';
  
    return {
      Image:'image',
      Id: id.toString(),
      Title: name,
      Date: Math.round(Math.random() * 100).toString(),
      Status: 'active',
      Action:'...'
    };
  }

}
