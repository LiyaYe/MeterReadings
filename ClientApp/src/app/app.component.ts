import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  close(reason: string) {
    this.sidenav.close();
  }
}

