import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SyllabusService } from '../../services/syllabus-service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-syllabus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './syllabus.html',
  styleUrls: ['./syllabus.css']
})
export class Syllabus {
    syllabus: Course[] = [];
    sortColumn: keyof Course | '' = '';
    sortDirection: 'asc' | 'desc' = 'asc';

    constructor(private syllabusService: SyllabusService) {}

    //Metod som laddar kursdata vid initiering
    ngOnInit() {
        this.syllabusService.getSyllabus().subscribe((data) => {
            this.syllabus = data;
        });
    }

    //Metod som sorterar kolumnerna med data beroende på vilken rubrik som klickas
    sortBy(column: keyof Course) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        this.syllabus.sort((a, b) => {
            const valueA = a[column].toLowerCase();
            const valueB = b[column].toLowerCase();

            if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }
}