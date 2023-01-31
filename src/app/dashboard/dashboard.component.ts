import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeeService } from '@app/services';
import { Observable, shareReplay, map, ReplaySubject } from 'rxjs';
import { IResponse } from '../core/models/response.model';
import { IEmployeeList } from '../core/models/employee-list.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BulkEditModalComponent } from '../shared/bulk-edit-modal/bulk-edit-modal.component';
import { IStats } from '../core/models/stats.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  displayedColumns = ['select', 'name', 'email', 'totalClockedTime', 'totalPaidRegularHours', 'totalPaidOvertimeHours'];

  selection = new SelectionModel<any>(true, []);

  dataSource: MatTableDataSource<IEmployeeList>;

  stats$: ReplaySubject<IStats> = new ReplaySubject();

  readonly employees: Observable<IResponse<IEmployeeList[]>> = this.employeeService.listForTable().pipe(
    map(response => {
      this.calculateStats(response.data || []);
      this.dataSource = new MatTableDataSource(response.data);
      return response;
    },
    ),
    shareReplay(1),
  );

  constructor(readonly employeeService: EmployeeService,
    public dialog: MatDialog) {}
  
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;

    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  openBulkEditModal(): void {
    const dialogRef = this.dialog.open(BulkEditModalComponent, {
      data: {
        employees: [...this.selection.selected],
      },
      minWidth: '600px',
    });
    dialogRef.afterClosed().subscribe(response => {
      console.log('after-close', response);
    });
  }

  clearSelection(): void {
    this.selection.clear();
  }

  calculateStats(employees: IEmployeeList[]): void {
    console.log('emp', employees);
    if (employees.length) {
      console.log('calculating', employees);
      this.stats$.next({
        totalNumberOfEmployees: employees.length,
        totalClockedTime: employees.reduce((acc, curr) => acc + curr.totalClockedTime, 0),
        totalOvertimeHours: employees.reduce((acc, curr) => acc + curr.overtimeHourlyRate, 0),
        totalRegularHours: employees.reduce((acc, curr) => acc + curr.totalPaidRegularHours, 0),
      });
    }
  }
}
