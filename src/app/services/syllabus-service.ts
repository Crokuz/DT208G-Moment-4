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

    //Hämta ramschema
    getSyllabus(): Observable<Course[]> {
        return this.http.get<Course[]>(this.url);
    }
}
