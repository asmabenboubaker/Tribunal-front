import { Component,OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View, DragEventArgs, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { AudienceService } from 'src/app/service/audience.service';
import { AudienceEvent } from './AudienceEvent'; 
import { parseISO } from 'date-fns';
import { DataManager, ODataV4Adaptor, UrlAdaptor } from '@syncfusion/ej2-data';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
@Component({
  selector: 'app-scheduler',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  template: `<ejs-schedule width='100%' height='550px' [readonly]="readonly" [selectedDate]="selectedDate" [eventSettings]="eventSettings" (popupOpen)='onPopupOpen($event)'
  (dragStart) = "onDragStart($event)" [views]='scheduleViews'
  >
    </ejs-schedule>`
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
     dataSource: this.dataManager, fields: {
      juge :{name:'juge'},
      id: 'Id',
      subject: { name: 'subject' },
      location: { name: 'location' },
      description: { name: 'description' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' },
      recurrenceRule: { name: 'ShipRegion' },
      
    }
  };
  // public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
  onDragStart(args: DragEventArgs): void {
    args.excludeSelectors = 'e-header-cells,e-header-day,e-header-date,e-all-day-cells';
}
// add field juge 
// onPopupOpen(args: PopupOpenEventArgs): void {
//   if (args.type === 'Editor') {
//       // Create required custom elements in initial time
//       if (!args.element.querySelector('.custom-field-row')) {
//           let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
//           let formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
//           formElement.firstChild?.insertBefore(row, args.element.querySelector('.e-title-location-row'));
//           let container: HTMLElement = createElement('div', { className: 'e-juge-container' });
//           let inputEle: HTMLInputElement = createElement('input', {
//               className: 'e-float-input e-control-wrapper e-input-group', attrs: { name: 'juge'}
//           }) as HTMLInputElement;
//           // Add the label
//       let labelEle: HTMLElement = createElement('label', {
//         innerHTML: 'Juge:',
//         className: 'e-float-text e-label-top',
//         id:'label_subject',
//         attrs: { for: 'description' }
//       });
//        container.appendChild(labelEle);

//           container.appendChild(inputEle);
//           row.appendChild(container);
    
//           inputEle.setAttribute('name', 'juge');
          
//           // let eventObj: any = args.data;
//           // // Set the value of the input field with the existing data
//           // inputEle.value = eventObj.juge || '';
//       }
//   }
// }
 
onPopupOpen(args: PopupOpenEventArgs): void {
  if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
          let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
          let formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
          formElement.firstChild?.insertBefore(row, args.element.querySelector('.e-title-location-row'));
          let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
          let inputEle: HTMLInputElement = createElement('input', {
              className: 'e-field', attrs: { name: 'juge' }
          }) as HTMLInputElement;
          container.appendChild(inputEle);
          row.appendChild(container);
         
          inputEle.setAttribute('name', 'juge');
      }
  }
}
  

  initializeCalendar(): void {
    // The method to initialize the calendar should be called after data is set.
    console.log("Initializing calendar...");
    this.scheduleObj?.refresh(); // Refresh the calendar to apply the new data
  } 
}