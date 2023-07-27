import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View, DragEventArgs, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { AudienceService } from 'src/app/service/audience.service';
import { AudienceEvent } from './AudienceEvent'; 
import { parseISO } from 'date-fns';
import { DataManager, ODataV4Adaptor, ReturnOption, UrlAdaptor } from '@syncfusion/ej2-data';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { query } from '@angular/animations';
import { Query } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-scheduler',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  template: `
    <select #locationFilter (change)="onLocationFilterChange(locationFilter.value)">
  <option value="">All Locations</option>
  <option value="tribunal1">tribunal1</option>
  <option value="tribunal2">tribunal2</option>
  <option value="tribunal3">Location3</option>
  <!-- Add more location options as needed -->
</select>
  <ejs-schedule #scheduleObj width='100%' height='550px' [readonly]="readonly" [selectedDate]="selectedDate" [eventSettings]="eventSettings" (popupOpen)='onPopupOpen($event)'
  (dragStart) = "onDragStart($event)" [views]='scheduleViews'
  >
<!--  
    </ejs-schedule>
    <ejs-dropdownlist
      #locationDropdown
      [dataSource]="locationData"
      [fields]="locationFields"
      [value]="defaultLocationId"
      (change)="onLocationChange($event)"
    ></ejs-dropdownlist> -->

    `
})
export class SchedulerComponent implements OnInit{
  ngOnInit(): void {
    // this.loadAudienceEvents();
    this.loadData(); 
  }
  constructor(private audienceService: AudienceService) {}
  public readonly: boolean = false;
  @ViewChild("scheduleObj") scheduleObj?: ScheduleComponent;
  @ViewChild("addButton") addButton?: ButtonComponent;
  @ViewChild('locationDropdown') locationDropdown!: DropDownList;
  
  public dropdownFields: Object = { text: 'location', value: 'location' };
  private eventsData: Object[] = [];
  private loadData(): void {
    this.dataManager.executeQuery(new Query()).then((e: ReturnOption) => {
      this.eventsData = e.result as Object[];
    });
  }
  public onLocationFilterChange(selectedLocation: string): void {
    // Check if events data is available before applying the filter
    if (this.eventsData.length > 0) {
      // Use the 'setProperties' method of the Schedule component to filter events
      this.scheduleObj?.setProperties({ eventSettings: { dataSource: this.getFilteredEvents(selectedLocation) } });
    }
  }
  private getFilteredEvents(selectedLocation: string): Object[] {
    // If no location is selected, return all events
    if (!selectedLocation) {
      return this.eventsData;
    }

    // Filter events based on the selected location
    return this.eventsData.filter(event => event['location'] === selectedLocation);
  }
  public selectedDate: Date = new Date(2023, 7, 24);
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:8081/picosoft/api/schedule/loadData',
    crudUrl: 'http://localhost:8081/picosoft/api/schedule/updateData',
    adaptor: new UrlAdaptor,
    crossDomain: true
  });
  // locationData: any[] = [
  //   { text: 'bnousonou', value: 1 },
  //   { text: 'Location 2', value: 2 },
  //   // Add more locations as needed
  // ];
  
  // locationFields: any = { text: 'text', value: 'value' };
  // defaultLocationId: number = 1; 
  // onLocationChange(args: ChangeEventArgs): void {
  //   console.log("wwwwwwwwwwwwwww");
  //   const selectedLocationId = args.name;
  //   console.log(selectedLocationId);
  //   const updatedApiUrl = `http://localhost:8081/picosoft/api/schedule/selectByLocation?location=${selectedLocationId}`;
    
  //   // Update the adaptor URL with the updated API URL  
  //   this.dataManager.adaptor = new UrlAdaptor({ url: updatedApiUrl });
  
  //   // Refresh the Scheduler to load events from the updated API URL
  //   this.scheduleObj?.refresh();
  // }
  // onLocationChange(args: any): void {
  //   console.log('Dropdown change event:', args);
  
  //   if (!args.isInteracted) {
  //     // The change event might be triggered programmatically
  //     return;
  //   }
  
  //   console.log('Selected location:', args.itemData);
  
  //   const selectedLocationId = args.itemData.text;
  //   const updatedApiUrl = `http://localhost:8081/picosoft/api/schedule/selectByLocation?location=${selectedLocationId}`;
  //   console.log('Selected Location ID:', selectedLocationId);
  //   console.log('url:', updatedApiUrl);
  //   // Update the adaptor URL with the updated API URL
  //   this.dataManager.adaptor = new UrlAdaptor({ url: updatedApiUrl });
  
  //   // Load data from the updated API URL using the DataManager's executeQuery method
  //   this.dataManager.executeQuery(new Query()).then((e: any) => {
      
  //     // Check if scheduleObj is defined before accessing its properties
  //     if (this.scheduleObj) {
  //       // Get the eventSettings object
  //       const eventSettings = this.scheduleObj.eventSettings;
        
  //       if (eventSettings) {
  //         // Assign the loaded data to the Scheduler's dataSource
  //         eventSettings.dataSource = e.result;
  //         console.log('eventSettings:', eventSettings.dataSource);
  //         this.scheduleObj.refresh();
  //       }
  //     }
  //   });
  // }
   
 
  // Helper method to get the filtered events based on the selected location
   
  public eventSettings: EventSettingsModel = {
    includeFiltersInQuery: true,dataSource: this.dataManager, fields: {
      juge :{name:'juge'},
      id: 'Id',
      subject: { name: 'subject' , title:'sujet',validation: { required: true } },
      location: { name: 'location' , title:'tribunal',validation: { required: true } },
      description: { name: 'description',validation: { required: true }  },
      startTime: { name: 'startTime'  },
      endTime: { name: 'endTime'},
      recurrenceRule: { name: 'ShipRegion' },
      demandeur: { name: 'demandeur',validation: { required: true } },
      defendeur: { name: 'defendeur' ,validation: { required: true }},
      
    }
  };
  // public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
  onDragStart(args: DragEventArgs): void {
    args.excludeSelectors = 'e-header-cells,e-header-day,e-header-date,e-all-day-cells';
} 
 
//underlined Juge et requérant field
onPopupOpen(args: PopupOpenEventArgs): void {
  if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
          let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
          let formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
          formElement.firstChild?.insertBefore(row, args.element.querySelector('.e-title-location-row'));
          let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
          //add a div with class " e-float-input e-control-wrapper e-input-group " inside container and ari
          let container2: HTMLInputElement = createElement('input', {
              className: 'e-float-input e-control-wrapper e-input-group e-field', attrs: {title:'Juge', name: 'juge', 'aria-labelledby':"label_juge",  placeholder: 'Juge' }
          }) as HTMLInputElement;
          
          
          let spanLine: HTMLElement = createElement('span', { className: 'e-float-line' });
          // add label with class e-float-text e-label-top 
          let labelEle: HTMLElement = createElement('label', {
            innerHTML: 'Juge:',
            className: 'e-float-text e-label-top',
            id:'label_juge',
            attrs: { for: 'juge' }
          });
          
          let inputEle: HTMLInputElement = createElement('input', {
              className: '', attrs: { name: 'juge' }
          }) as HTMLInputElement;
          
          container.appendChild(container2);
          container2.appendChild(inputEle);

          //let litleRow:HTMLElement = args.element.querySelector('.e-title-location-row');
          //appent to title location row
          //inputEle.appendChild(litleRow);
          //add spanafter inputEle
          container2.appendChild(spanLine);
          container2.appendChild(labelEle);
          row.appendChild(container);
         
          inputEle.setAttribute('name', 'juge');
          ////////////////////////////////////////////////////////////////////////////////////
          let row1: HTMLElement = createElement('div', { className: 'custom-field-row' });
          let formElement1: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
          formElement1.firstChild?.insertBefore(row1, args.element.querySelector('.e-title-location-row'));
          let container3: HTMLElement = createElement('div', { className: 'custom-field-container' });
          //add a div with class " e-float-input e-control-wrapper e-input-group " inside container and ari
          let container33: HTMLInputElement = createElement('input', {
              className: 'e-float-input e-control-wrapper e-input-group e-field', attrs: {title:'demandeur', name: 'demandeur', 'aria-labelledby':"label_demandeur",  placeholder: 'demandeur' }
          }) as HTMLInputElement;
          
          
          let spanLine1: HTMLElement = createElement('span', { className: 'e-float-line' });
          // add label with class e-float-text e-label-top 
          let labelEle1: HTMLElement = createElement('label', {
            innerHTML: 'demandeur:',
            className: 'e-float-text e-label-top',
            id:'label_demandeur',
            attrs: { for: 'demandeur' }
          });
          
          let inputEle1: HTMLInputElement = createElement('input', {
              className: '', attrs: { name: 'demandeur' }
          }) as HTMLInputElement;
          
          container.appendChild(container33);
          container2.appendChild(inputEle1);
          container2.appendChild(spanLine1);
          container2.appendChild(labelEle1);
          row.appendChild(container3);
         
          inputEle.setAttribute('name', 'demandeur');
          //////////////////////////: //////////////////////////////////////////////////////
          let row2: HTMLElement = createElement('div', { className: 'custom-field-row' });
          let formElement2: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
          formElement2.firstChild?.insertBefore(row2, args.element.querySelector('.e-title-location-row'));
          let container4: HTMLElement = createElement('div', { className: 'custom-field-container' });
          //add a div with class " e-float-input e-control-wrapper e-input-group " inside container and ari
          let container44: HTMLInputElement = createElement('input', {
              className: 'e-float-input e-control-wrapper e-input-group e-field', attrs: {title:'demandeur', name: 'defendeur', 'aria-labelledby':"label_defendeur",  placeholder: 'defendeur' }
          }) as HTMLInputElement;
          
          
          let spanLine2: HTMLElement = createElement('span', { className: 'e-float-line' });
          // add label with class e-float-text e-label-top 
          let labelEle2: HTMLElement = createElement('label', {
            innerHTML: 'defendeur',
            className: 'e-float-text e-label-top',
            id:'label_defendeur',
            attrs: { for: 'defendeur' }
          });
          
          let inputEle2: HTMLInputElement = createElement('input', {
              className: '', attrs: { name: 'defendeur' }
          }) as HTMLInputElement;
          
          container.appendChild(container44);
          container2.appendChild(inputEle2);
          container2.appendChild(spanLine2);
          container2.appendChild(labelEle2);
          row.appendChild(container4);
         
          inputEle.setAttribute('name', 'defendeur');
      }
  }
}
  

  initializeCalendar(): void {
    // The method to initialize the calendar should be called after data is set.
    console.log("Initializing calendar...");
    this.scheduleObj?.refresh(); // Refresh the calendar to apply the new data
  } 
}