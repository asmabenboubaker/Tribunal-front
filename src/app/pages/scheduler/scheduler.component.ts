import { Component,OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { AudienceService } from 'src/app/service/audience.service';
import { AudienceEvent } from './AudienceEvent'; 


@Component({
  selector: 'app-scheduler',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  template: `
    <button #addButton ejs-button id="addButton" type="button" content="Add" (click)="onButtonClick()"></button>
    <ejs-schedule #scheduleObj width='100%' height='520px' [selectedDate]="selectedDate" [eventSettings]="eventSettings" [views]="scheduleViews"></ejs-schedule>
  `
})
export class SchedulerComponent implements OnInit{
  ngOnInit(): void {
    this.loadAudienceEvents();
  }
  constructor(private audienceService: AudienceService) {}

  @ViewChild("scheduleObj") scheduleObj?: ScheduleComponent;
  @ViewChild("addButton") addButton?: ButtonComponent;
  public selectedDate: Date = new Date(2018, 1, 15);
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel = {
    dataSource: [
      // {
     
      //   Subject: 'Testing',
      //   StartTime: new Date(2018, 1, 11, 9, 0),
      //   EndTime: new Date(2018, 1, 11, 10, 0),
      //   IsAllDay: false,
      //   idAudience: 1,
      //   Location: 'Tribunal 1',
      //   juge: 'Judge 1',
       
      //   Description: 'A celestial event in the Betelgeuse star system.'
      // },
      // {
   
      //   Subject: 'Vacation',
      //   StartTime: new Date(2018, 1, 13, 9, 0),
      //   EndTime: new Date(2018, 1, 13, 10, 0),
      //   IsAllDay: false,
      //   idAudience: 2,
      //   dateAudience: new Date(),
      //   Location : 'Tribunal 2',
      //   juge: 'Judge 2',
        
      //   Description: 'A celestial event in the Betelgeuse star system.'
      // }
    ] as AudienceEvent[]
  };
  // loadAudienceEvents(): void {
  //   console.log('Error fetching audience events')
  //   this.audienceService.getAudienceEvents().subscribe(
  //     (data: AudienceEvent[]) => {
  //       this.eventSettings.dataSource = data; 
  //       console.log('data',data)
  //     },
  //     (error: any) => {
  //       console.log('Error fetching audience events:', error);
  //     }
  //   );
  // }
  // loadAudienceEvents(): void {
   
  //   this.audienceService.getAudienceEvents().subscribe(
      
  //     (data: AudienceEvent[]) => {
  //       data.forEach(event => {
           
  //       // event.startTime = new Date(event.startTime).toString();
  //       // event.endTime = new Date(event.endTime).toString();
  //       });
  //       this.eventSettings.dataSource = data;
  //       console.log("ddddddd",this.eventSettings.dataSource )
  //     },
  //     (error: any) => {
  //       console.log('Error fetching audience events:', error);
  //     }
  //   );
  // }

  loadAudienceEvents(): void {
    this.audienceService.getAudienceEvents().subscribe(
      (data: AudienceEvent[]) => {
        console.log("aaaaaaaaaaaa",data); 
        data.forEach(event => {
          event.StartTime = new Date(event.StartTime).toISOString();
          event.EndTime = new Date(event.EndTime).toISOString();
          console.log(  event.StartTime);
        });
        this.eventSettings.dataSource = data;
        console.log("data", data);
      },
      (error: any) => {
        console.log('Error fetching audience events:', error);
      },
      () => {
        // After fetching and setting the data, call the initialization method.
        this.initializeCalendar();
      }
    );
  }

  initializeCalendar(): void {
    // The method to initialize the calendar should be called after data is set.
    console.log("Initializing calendar...");
    this.scheduleObj?.refresh(); // Refresh the calendar to apply the new data
  }

  public onButtonClick(): void {
    let data: Object[] = [
      {
         
        Subject: 'Conference',
        StartTime: new Date(2018, 1, 12, 9, 0),
        EndTime: new Date(2018, 1, 12, 10, 0),
        IsAllDay: true,
        idAudience: 3,
        dateAudience: new Date(),
        tribunal: 'Tribunal 3',
        juge: 'Judge 3',
        objet: 'Conference meeting'
      },
      {
        
        Subject: 'Meeting',
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 11, 30),
        IsAllDay: false,
        idAudience: 4,
        dateAudience: new Date(),
        tribunal: 'Tribunal 4',
        juge: 'Judge 4',
        objet: 'Project meeting'
      }
    ];
    this.scheduleObj?.addEvent(data);
    this.addButton?.element.setAttribute('disabled', 'true');
  }
}
