import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MembersService } from './service/members.service';
import { Router } from '@angular/router';

export interface Member {
  id: number;
  fullname: string;
  studentNumber: string;
  gender: string;
}

@Component({
  selector: 'app-members',
  imports: [LayoutComponent, SharedModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent {
  displayedColumns: string[] = [
    'no',
    'fullname',
    'studentNumber',
    'gender',
    'action',
  ];

  dataSource = new MatTableDataSource<Member>([]);

  constructor(
    private router: Router,
    private membersService: MembersService
  ) {
    this.retrieveMembers();
  }

  navigateToFormMember(id: number | null = null) {
    if (id) {
      this.router.navigate(['/members/edit'], { queryParams: { id: id } });
    } else {
      this.router.navigateByUrl('/members/add-member');
    }
  }

  retrieveMembers() {
    this.membersService.getMembers().subscribe({
      next: (response) => {
        if (response.code === '00') {
          this.dataSource.data = response.result;
        }
      },
    });
  }

  deleteMember(id: number) {
    if(confirm('Apakah anda yakin ingin menghapus data ini?')) {
      this.membersService.deleteMembers(id).subscribe({
        next: (response) => {
          if (response.code === '00') {
            alert('Berhasil Delete Data');
            this.retrieveMembers();
          }
        },
      });
    }
  }
}
