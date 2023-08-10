import { Component } from '@angular/core';

@Component({
  selector: 'app-pagetion',
  templateUrl: './pagetion.component.html',
  styleUrls: ['./pagetion.component.css']
})
export class PagetionComponent {
  p: number = 1;
  items: any[] = Array.from({length: 100}).map((_, i) => `Item ${i + 1}`);
}