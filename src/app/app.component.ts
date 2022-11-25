import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';

interface Site {
  id?: number;
  name: string;
  url: string;
}

const apiUrl = "http://localhost:3000/sites";
const jsonHeaders = { "Content-type": "application/json" }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'json-angular-app';

  sites: Site[] = [];
  siteName: string = '';
  siteURL: string = '';
  updateId: string = '';
  updateName: string = '';
  updateURL: string = '';
  deleteId: string = '';

  ngOnInit(): void {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        this.sites = data;
      })
      .catch(err => console.log(err));
  }

  createData() {
    if (!this.siteName.trim() || !this.siteURL.trim()) return;
    fetch(apiUrl, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ name: this.siteName, url: this.siteURL }),
    })
      .then((res) => res.json())
      .then((data: Site) => {
        this.sites.push(data);
        this.siteName = '';
        this.siteURL = '';
      }).catch(err => console.log(err));
  }

  updateData() {
    if (!this.updateId.trim() || !this.updateName.trim() || !this.updateURL) return;
    fetch(`${apiUrl}/${this.updateId}`, {
      method: "PUT",
      headers: jsonHeaders,
      body: JSON.stringify({ name: this.updateName, url: this.updateURL }),
    })
      .then((res) => res.json())
      .then((data: Site) => {
        const index = this.sites.findIndex(site => site.id === data.id);
        this.sites[index] = { ...data };

        this.updateId = '';
        this.updateName = '';
        this.updateURL = '';
      }).catch(err => console.log(err));
  }

  deleteData() {
    if (!this.deleteId.trim()) return;

    fetch(`${apiUrl}/${this.deleteId}`, {
      method: "DELETE"
    })
      .then(() => {
        const index = this.sites.findIndex(
          (site) => site.id === Number(this.deleteId)
        );
        this.sites.splice(Number(index), 1);
        this.deleteId = '';
      }).catch(err => console.log(err));
  }
}