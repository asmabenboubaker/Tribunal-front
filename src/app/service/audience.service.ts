import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AudienceEvent } from '../pages/scheduler/AudienceEvent';  

@Injectable({
  providedIn: 'root'
})
export class AudienceService {
  private apiUrl = 'http://localhost:8081/picosoft/list';  

  constructor(private http: HttpClient) {}

  getAudienceEvents(): Observable<AudienceEvent[]> {
    return this.http.get<AudienceEvent[]>(this.apiUrl);
  }
  getAudienceEventsByLocation(location: string): Observable<any[]> {
    const Url = `http://localhost:8081/picosoft/api/schedule/selectByLocation?location=${location}`;
    return this.http.post<any[]>(Url, location);
  }
}
