import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application';
  api = 'http://192.46.214.33:3000/api/data/getUpcomingMatches';
  matchesData: any;
  filteredData: any;
  expandedTournaments: { [key: string]: { [key: string]: boolean } } = {};
  tabs: any = [];
  showFiltered = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.getData().subscribe(data => {
      this.matchesData = data.data.matches;
      this.tabs = data.data.tabs;
    });
  }

  getData(): Observable<any> {
    return this.http.get(this.api);
  }

  getFilteredData(event: any) {
    let slug = event.slug;
    console.log(slug)
    this.http.get(this.api + '/' + slug).subscribe((item: any) => {
      this.filteredData = item.data;
      console.log(item)
      this.showFiltered = true;
      console.log(this.filteredData)
      // this.cdr.detectChanges(); // Trigger change detection
    });
    console.log(this.filteredData)
  }

  showAllData() {
    this.showFiltered = false;
  }

  getKeys(obj: any) {
    return obj ? Object.keys(obj) : [];
  }
}
