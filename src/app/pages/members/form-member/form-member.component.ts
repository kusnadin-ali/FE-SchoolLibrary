import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersService } from '../service/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-member',
  imports: [LayoutComponent, SharedModule],
  templateUrl: './form-member.component.html',
  styleUrl: './form-member.component.css'
})
export class FormMemberComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      studentNumber: ['', [Validators.required]],
      gender: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'] ? +params['id'] : null;
      if (this.id) {
        this.retrieveDetailBookCatalog(this.id);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.membersService.updateMembers(this.id, this.form.value).subscribe({
          next: (response) => {
            if (response.code === '00') {
              alert('Berhasil Update Data');
            }
            console.log(response);
          },
        })
      } else {
        this.membersService.createMembers(this.form.value).subscribe({
          next: (response) => {
            if (response.code === '00') {
              alert('Berhasil Create Data');
            }
            console.log(response);
          },
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  retrieveDetailBookCatalog(id: number) {
    this.membersService.getDetailMembers(id).subscribe({
      next: (response) => {
        this.form.patchValue({
          fullname: response.result.fullname,
          studentNumber: response.result.studentNumber,
          gender: response.result.gender
        });
      },
    });
  }
}
