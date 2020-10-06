import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {QuestionService} from '../../service/question.service';
import {UserService} from '../../service/user.service';
import {PeriodicElement} from '../../question/question.component';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-active-new-users',
  templateUrl: './active-new-users.component.html',
  styleUrls: ['./active-new-users.component.css']
})
export class ActiveNewUsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'batch', 'email', 'address', 'role', 'phone', 'active', 'update'];
  dataSource = new MatTableDataSource();
  users = [];
  roles = [];
  batches = [];
  active = [0, 1];
  activeDisplay = ['No', 'Yes'];

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUserList().subscribe((res) => {
      this.users = res;
      // console.log(this.users);
      // console.log(this.roles);
      // console.log(this.batches);
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]['batch'] !== undefined) {
          this.users[i]['batch'] = this.users[i]['batch']['batch'];
        }
      }

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.users);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });

    this.userService.GetUserRoles().subscribe((res) => {
      this.roles = res;
      // this.rolesDisplay = this.roles.map( (role) => role.name);
    });

    this.userService.GetUserBatches().subscribe((res) => {
      this.batches = res;
    });
  }

  UpdateUser(userInfo) {
    this.userService.UpdateUser(userInfo).subscribe( res => alert('Successfully?: ' + res['success']));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
