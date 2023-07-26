import { Component,OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View, DragEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { AudienceService } from 'src/app/service/audience.service';
import { AudienceEvent } from './AudienceEvent'; 
import { parseISO } from 'date-fns';
import { DataManager, ODataV4Adaptor, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-scheduler',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  template: `<ejs-schedule width='100%' height='550px' [readonly]="readonly" [selectedDate]="selectedDate" [eventSettings]="eventSettings"></ejs-schedule>`
})
export class SchedulerComponent implements OnInit{
  ngOnInit(): void {
    // this.loadAudienceEvents();
  }
  constructor(private audienceService: AudienceService) {}
  public readonly: boolean = false;
  @ViewChild("scheduleObj") scheduleObj?: ScheduleComponent;
  @ViewChild("addButton") addButton?: ButtonComponent;
  public selectedDate: Date = new Date(2023, 7, 24);
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:8081/picosoft/api/schedule/loadData',
    crudUrl: 'http://localhost:8081/picosoft/api/schedule/updateData',
    adaptor: new UrlAdaptor,
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = {
    includeFiltersInQuery: true, dataSource: this.dataManager, fields: {
      id: 'Id',
      subject: { name: 'subject' },
      location: { name: 'location' },
      description: { name: 'description' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' }
      // recurrenceRule: { name: 'ShipRegion' }
    }
  };
  // public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
  onDragStart(args: DragEventArgs): void {
    args.scroll = { enable: true, scrollBy: 5, timeDelay: 200 };
}

  

  initializeCalendar(): void {
    // The method to initialize the calendar should be called after data is set.
    console.log("Initializing calendar...");
    this.scheduleObj?.refresh(); // Refresh the calendar to apply the new data
  } 
}