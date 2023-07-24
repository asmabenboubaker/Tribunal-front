export interface AudienceEvent {
   
  Subject: string;

  StartTime: string;
  EndTime: string;
  IsAllDay: boolean,
  
  idAudience: number;
  Location: string;
  juge: string;
  Description: string;
  //   Subject: 'Testing',
      //   StartTime: new Date(2018, 1, 11, 9, 0),
      //   EndTime: new Date(2018, 1, 11, 10, 0),
      //   IsAllDay: false,
      //   idAudience: 1,
      //   Location: 'Tribunal 1',
      //   juge: 'Judge 1',
       
      //   Description: 'A celestial event in the Betelgeuse star system.'
}
