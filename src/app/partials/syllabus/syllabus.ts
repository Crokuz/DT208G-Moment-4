/*
Författare: Leander Norberg
Projektnamn: Moment 4
Beskrivning: Praktisk laboration utvecklat i samband med kursen 
Programmering i TypeScript (DT208G ) vid mittuniversitetet, VT2025 
*/

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SyllabusService } from '../../services/syllabus-service';
import { Course } from '../../models/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-syllabus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './syllabus.html',
  styleUrls: ['./syllabus.css']
})

export class Syllabus {
    allCourses: Course[] = [];
    syllabus: Course[] = [];
    searchTerm = '';

    sortColumn: keyof Course | '' = '';
    sortDirection: 'asc' | 'desc' = 'asc';

    constructor(private syllabusService: SyllabusService) {}

    ngOnInit() {
        this.syllabusService.getSyllabus().subscribe((data) => {
            this.allCourses = data;
            this.syllabus = data;
        });
    }

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

    filterCourses() {
        const term = this.searchTerm.toLowerCase();
        this.syllabus = this.allCourses.filter(course =>
            course.code.toLowerCase().includes(term) ||
            course.coursename.toLowerCase().includes(term) ||
            course.progression.toLowerCase().includes(term)
        );
    }
}