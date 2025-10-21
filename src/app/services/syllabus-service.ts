/*
Författare: Leander Norberg
Projketnamn: Moment 4
Beskrivning: Praktisk laboration utvecklat i samband med kursen 
Programmering i TypeScript (DT208G ) vid mittuniversitetet, VT2025 
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {
    private url: string = "https://webbutveckling.miun.se/files/ramschema.json";

    constructor(private http: HttpClient) {}

    //Hämtar ramschema
    getSyllabus(): Observable<Course[]> {
        return this.http.get<Course[]>(this.url);
    }
}
