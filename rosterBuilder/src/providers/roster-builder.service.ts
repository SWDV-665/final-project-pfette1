import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, Subject, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RosterBuilderService {

  players: Object = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>

  baseUrl = "http://localhost:8080";

  constructor(public http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getPlayers(): Observable<object[]> {
    return this.http.get(this.baseUrl + '/api/rosterBuilder').pipe(
      map(this.extractData),
      catchError(err => { throw err })
    )
  }

  private extractData(res: Response | any) {
    let body = res;
    return body || {};
  }

  addPlayer(player: any) {
    this.http.post(this.baseUrl + '/api/rosterBuilder', player).subscribe(res => {
      this.players = res;
      this.dataChangeSubject.next(true);
    });
  }

  removePlayer(id: any) {
    this.http.delete(this.baseUrl + '/api/rosterBuilder/' + id).subscribe(res => {
      this.players = res;
      this.dataChangeSubject.next(true);
    });
  }

  editPlayer(player: any, index: number, id: any) {
    this.http.put(this.baseUrl + '/api/rosterBuilder/' + id, player).subscribe(res => {
      this.players = res;
      this.dataChangeSubject.next(true);
    });
  }
}
