import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  NavController,
} from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { ResourceService } from '../../resource.service';

@Component({
  selector: 'app-category-form-container',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
})
export class CategoryFormPage implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  // category: Category;
  category: Observable<Category>;
  isNew = true;
  // isLoading: boolean

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        let categoryUrlName = params.get('category');
        if (categoryUrlName) {
          this.isNew = false;
          this.category = this.resourceService.data.getCategories().pipe(
            map((categories) => {
              let activeCategory = categories.find(
                (category) =>
                  category.urlFriendlyName == categoryUrlName ||
                  category.name == categoryUrlName
              );
              // console.log('active category:', activeCategory)
              return activeCategory;
            })
          );
        }
      },
    });
  }

  ionViewWillEnter() {}

  async confirmDelete(category: Category) {
    const alert = await this.alertCtrl.create({
      header: `Delete ${category.name} category`,
      message: 'Are you sure you want to delete this category?',
      buttons: [
        {
          text: 'Delete',
          handler: () => this.deleteCategoryLocal(category._id),
          role: 'destructive',
          cssClass: 'danger',
        },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await alert.present();
    // console.log(await alert.onDidDismiss());
  }

  createCategory(newCategory: Category) {
    // console.log('submitted');
    // console.log(newCategory)
    newCategory.suggestedDetails = newCategory.suggestedDetails.filter(
      (detail) => detail != ''
    );
    // this.resourceService.categories.subscribe(c => console.log(c))
    this.resourceService.db.createCategory(newCategory).subscribe({
      next: (createdCategory) => {
        console.log(createdCategory);
        this.resourceService.addCategoryToList(createdCategory);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  createCategoryLocal(category: Category) {
    setTimeout(() => {
      this.resourceService.addCategoryToList(category);
    }, 2000);
  }

  updateCategoryLocal(category: Category) {
    // console.log(category);
    setTimeout(() => {
      this.resourceService.editCategoryInList(category)
    }, 2000);
  }

  deleteCategoryLocal(categoryId: string) {
    // console.log(categoryId);
    // this.isLoading = true
    this.resourceService.data.getCategories()
      .pipe(take(1))
      .subscribe({ next: () => this.navCtrl.navigateBack('/resources') })
    setTimeout(() => {
      this.resourceService.removeCategoryFromList(categoryId)
    }, 2000);
  }
}
