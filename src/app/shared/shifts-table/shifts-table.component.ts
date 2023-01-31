import { Component, ChangeDetectionStrategy, Input, type OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['./shifts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftsTableComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @Input() shifts: FormArray;

  dataSource = new MatTableDataSource<AbstractControl>();

  displayedColumns = ['name', 'clockIn', 'clockOut', 'total'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.shifts.controls);
  }

  getValue(value: string): Date {
    return new Date(value);
  }

  handleChange(event: any, group: FormGroup): void {
    // TODO: Change formgroup values on change time
    console.log('event and group', event, group);
  }

}
