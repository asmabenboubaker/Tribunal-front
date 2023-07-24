import { Component,OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { AudienceService } from 'src/app/service/audience.service';
import { AudienceEvent } from './AudienceEvent'; 
import { parseISO } from 'date-fns';

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
  public selectedDate: Date = new Date(2023, 7, 24);
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings2: EventSettingsModel = {
    dataSource: [ ]};
  public eventSettings: EventSettingsModel = {
    dataSource: [   
    //   {
     
    //     Subject: 'Testing',
    //     StartTime: "2023-07-24T06:00:00.000Z",
    //     EndTime: "2023-07-24T06:00:00.000Z",
    //     startTime: "2023-07-24T06:00:00.000Z",
    //     IsAllDay: false,
    //     // idAudience: 1,
    //     // Location: 'Tribunal 1',
    //     // juge: 'Judge 1',
       
    //     // Description: 'A celestial event in the Betelgeuse star system.'
    //   },
    //   {
    //     // idAudience: 1,
    //     StartTime: "2023-07-24T06:00:00.000Z",
    //     EndTime: "2023-07-24T06:00:00.000Z",
    //     startTime: new Date(2023, 6, 24, 9, 0),
    //   //   tribunal: "tribunal 2",
    //   //   juge: "Judge 2",
    //   // endTime: "2023-07-24T11:00:00.000Z",
        
    //   //   description: "zzzzzzzzzzzzzzzzzzzzzzzzzzz",
    //      Subject: "Testing 2",
    //     isAllDay: false
    // },
      // {
   
      //   Subject: 'Vacation',
      //   StartTime: new Date(2018, 1, 13, 9, 0),
      //   EndTime: new Date(2018, 1, 13, 10, 0),
      //   IsAllDay: false,
      //   idAudience: 2,
        
      //   Location : 'Tribunal 2',
      //   juge: 'Judge 2',
        
      //   Description: 'A celestial event in the Betelgeuse star system.'
      // }
    ]  
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
      (data: Record<string, any>[]) => {
        console.log("DATA :::: ",data); 
        data.forEach(event => {
          event.StartTime = parseISO(event.StartTime);
          event.EndTime = new Date(event.EndTime).toISOString
          event.startTime= parseISO(event.startTime);
          event.endTime = new Date(event.endTime).toISOString
          console.log(  event.StartTime);
        });
        
        this.eventSettings.dataSource = data;
        this.initializeCalendar();
      },
      (error: any) => {
        console.log('Error fetching audience events:', error);
      },
       () => {
      //   // After fetching and setting the data, call the initialization method.
        
        
      //   this.initializeCalendar();
      console.log("dataSource STARTIME ::::: ", new Date(this.eventSettings.dataSource[0].startTime));
       }
      
    );
    console.log("dataSource[0] II : ", this.eventSettings.dataSource[0]);
  }

  initializeCalendar(): void {
    // The method to initialize the calendar should be called after data is set.
    console.log("Initializing calendar...");
    this.scheduleObj?.refresh(); // Refresh the calendar to apply the new data
  }

  public onButtonClick(): void {
    // let data: Object[] = [
    //   {
         
    //     Subject: 'Conference',
    //     StartTime: new Date(2018, 1, 12, 9, 0),
    //     EndTime: new Date(2018, 1, 12, 10, 0),
    //     IsAllDay: true,
    //     idAudience: 3,
    //     dateAudience: new Date(),
    //     tribunal: 'Tribunal 3',
    //     juge: 'Judge 3',
    //     objet: 'Conference meeting'
    //   },
    //   {
        
    //     Subject: 'Meeting',
    //     StartTime: new Date(2018, 1, 15, 10, 0),
    //     EndTime: new Date(2018, 1, 15, 11, 30),
    //     IsAllDay: false,
    //     idAudience: 4,
    //     dateAudience: new Date(),
    //     tribunal: 'Tribunal 4',
    //     juge: 'Judge 4',
    //     objet: 'Project meeting'
    //   }
    // ];
    // this.scheduleObj?.addEvent(data);
    // this.addButton?.element.setAttribute('disabled', 'true');
    alert("onButtonClick");
  }
}
