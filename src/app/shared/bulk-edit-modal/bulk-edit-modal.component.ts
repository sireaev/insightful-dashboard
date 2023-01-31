import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftService } from '@app/services';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IEmployeeList } from 'src/app/core/models/employee-list.model';
import { IShift } from 'src/app/core/models/shift.model';

@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit-modal.component.html',
  styleUrls: ['./bulk-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkEditModalComponent {
  editForm: FormGroup;

  private shifts: IShift[];

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  employeeControls$: ReplaySubject<FormArray> = new ReplaySubject();

  shiftControls$: ReplaySubject<FormArray> = new ReplaySubject();

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly shiftService: ShiftService) {
    this.retrieveShifts();
  }

  retrieveShifts(): void {
    const ids: number[] = this.data.employees.map((e: IEmployeeList) => e.id);
    this.shiftService.listByEmployeesId(ids).subscribe(response => {
      this.shifts = response; 
      this.initForm();
    });
  }

  initForm(): void {
    this.editForm = this.createGroup([...this.data.employees]);
    this.employeeControls$.next(<FormArray> this.editForm.get('employees'));
    this.shiftControls$.next(<FormArray> this.editForm.get('employees'));
    this.isLoading$.next(false);
  }

  getShiftsByIndex(index: number): FormArray {
    const employeeControl = (<FormArray> this.editForm.get('employees')).controls[index];
    if (!employeeControl) return this.fb.array([]);

    return <FormArray>employeeControl.get('shifts');
  }

  createGroup(data: IEmployeeList[]): FormGroup {
    return this.fb.group({
      employees: this.createEmployeesFormArray(data),
    });
  }

  createEmployeesFormArray(employees: IEmployeeList[]): FormArray {
    return this.fb.array(employees.map(employee => this.fb.group({
      id: this.fb.control(employee.id, []),
      name: this.fb.control(employee.name, []),
      hourlyRate: this.fb.control(employee.hourlyRate, []),
      overtimeHourlyRate: this.fb.control(employee.overtimeHourlyRate, []),
      shifts: this.createShiftsFormArray(this.shifts.filter(s => s.employeeId === employee.id)), 
    })));
  }

  createShiftsFormArray(shifts: IShift[]): FormArray {
    return this.fb.array(shifts.map((shift: IShift) => this.fb.group({
      employeeId: this.fb.control(shift.employeeId),
      clockIn: this.fb.control(shift.clockIn),
      clockOut: this.fb.control(shift.clockOut),
    })));
  }
}
