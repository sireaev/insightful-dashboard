import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IStats } from 'src/app/core/models/stats.model';

@Component({
  selector: 'app-card-stats',
  templateUrl: './card-stats.component.html',
  styleUrls: ['./card-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStatsComponent  {
  @Input() stats: IStats | null;
}
