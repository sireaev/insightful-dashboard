import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStatsComponent } from './card-stats/card-stats.component';
import { BulkEditModalComponent } from './bulk-edit-modal/bulk-edit-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { ShiftsTableComponent } from './shifts-table/shifts-table.component';
import { MatTableModule } from '@angular/material/table';
import { TotalTimePipe } from '../core/pipes/total-time.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const commonExports = [
  BulkEditModalComponent,
  TotalTimePipe,
  CardStatsComponent,
];

@NgModule({
  declarations: [
    ...commonExports,
    ShiftsTableComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  providers: [TotalTimePipe],
  exports: [...commonExports],
})
export class SharedModule { }
