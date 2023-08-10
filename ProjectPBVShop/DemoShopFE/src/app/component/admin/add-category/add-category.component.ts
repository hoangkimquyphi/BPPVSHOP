import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_service/category.service';
import { Category } from 'src/app/class/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  implements OnInit {
  addProductMessage: string | undefined;
  constructor(private category: CategoryService,private router: Router,) {}

  ngOnInit(): void {}

  submit(data: Category) {
    this.category.addCategory(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
        alert('Add Product successfully')
        this.router.navigate(['/admin']);
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}