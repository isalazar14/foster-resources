import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, skip, take } from 'rxjs/operators';
import { Category } from 'src/app/modules/resources/models/category.model';
import { Resource } from 'src/app/modules/resources/models/resource.model';
import { ResourceService } from 'src/app/modules/resources/resource.service';

@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.page.html',
  styleUrls: ['./new-resource.page.scss'],
})
export class NewResourcePage implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  // category: Category;
  resource: Observable<Resource>;
  category: Observable<Category>;
  isEditing = false;
  isLoading = true

  resourceForm = this.fb.group({
    name: [''],
    description: [''],
    imageUrl: [''],
    suggestedDetails: this.fb.array([]),
  });

  ngOnInit() {
    if (this.router.url.includes('edit')) {
      this.isEditing = true
      this.populateForm()
    }

    // this.route.paramMap.subscribe({
    //   next: (params) => {
    //     let categoryUrlName = params.get('category');
    //     let resourceId = params.get('resourceId');
    //     if (categoryUrlName) {
    //       this.category = this.resourceService.activeCategory
    //         }}})
  }

  populateForm() {
      // this.route.paramMap.subscribe({
      //   next: (params) => {
      //     // console.log('category form initial state:', category);

      //     // this.categoryForm.setValue(initialState as any)
      //   let categoryUrlName = params.get('category');
      //   let resourceId = params.get('resourceId');


      //   if (categoryUrlName) {
      //     this.isEditing = false;
      //     this.activeResource = this.resourceService.categories.pipe(
      //       map((categories) => {
      //         let activeCategory = categories.find(
      //           (category) =>
      //             category.urlFriendlyName == categoryUrlName ||
      //             category.name == categoryUrlName
      //         );
      //         // console.log('active category:', activeCategory)
      //         return activeCategory;
      //       })
      //     );
      //   }

      //     for (let key in category) {
      //       if (Array.isArray(category[key])) {
      //         let formArray = this.resourceForm.get(key) as FormArray;
      //         // console.log(formArray)
      //         formArray.clear();
      //         for (const item of category[key]) {
      //           // console.log(detail)
      //           formArray.push(this.fb.control(item));
      //         }
      //         formArray.push(this.fb.control(''));
      //       } else {
      //         this.resourceForm.get(key)?.setValue(category[key]);
      //       }
      //     }
      //   },
      // });
    
  }

  ionViewWillEnter() {}

  ngOnDestroy(): void {
    // if (this.activeCategorySub) this.activeCategorySub.unsubscribe()
  }

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

  get suggestedDetails() {
    return this.resourceForm.get('suggestedDetails') as FormArray;
  }



  addSuggestedDetail() {
    this.suggestedDetails.push(this.fb.control(''));
  }

  addSuggestedDetailIfAtLeastOneEntry() {
    let isLastItemPopulated = !!this.suggestedDetails.at(-1).value.length;
    if (isLastItemPopulated) {
      this.addSuggestedDetail();
    }
  }

  removeSuggestedDetail(i) {
    let lastIdx = this.suggestedDetails.length - 1;
    if (i < lastIdx) {
      this.suggestedDetails.removeAt(i);
    }
    // else {
    //   // this.suggestedDetails.at(lastIdx).setValue('');
    // }
    if (this.suggestedDetails.length == 0) {
      this.suggestedDetails.push(this.fb.control(''));
    }
    // else {
    //   // if (this.suggestedDetails.length == 0) this.addSuggestedDetail()
    // }
  }

  async onSubmit() {
    let savingModal = await this.showSavingModal();
    // Object.keys(this.categoryForm.value).forEach((field) => {
    //   if (typeof field == 'string') {
    //     console.log(this.categoryForm.value[field]);
    //   }
    // });
    // Object.keys(this.categoryForm.value).reduce((cleanedForm, field) =>{
    //   if (typeof field == 'string') cleanedForm[field] = this.categoryForm.value[field].trim()
    //   // if (typeof field == 'object') {
    //   //   cleanedForm[field] = (this.categoryForm.value[field] as Array<string>)
    //   //   .filter((d) => d != '')
    //   //   .map((d) => d.trim())
    //   // }
    //   return cleanedForm
    // }, {})

    const cleanedForm = this.getCleanForm();
    this.resourceService.data.getCategories().pipe(skip(1),take(1)).subscribe({
      next: async () => {
        // this.resetForm();
        await savingModal.dismiss();
        this.router.navigateByUrl('/resources');
        this.showSaveSuccessToast()
      },
      error: async (err) => {
        console.error(err)
        await this.alertSaveFailed()
      },
    });
    // this.submitHandler(cleanedForm);
  }

  getCleanForm() {
    return {
      name: this.resourceForm.value.name.trim(),
      description: this.resourceForm.value.description.trim(),
      imageUrl: this.resourceForm.value.imageUrl.trim(),
      suggestedDetails: this.resourceForm.value.suggestedDetails
        .filter((d) => d != '')
        // .map((d) => d.trim()),
    };
  }

  resetForm() {
    this.resourceForm.reset();
  }

  async confirmCancel() {
    const alert = await this.alertCtrl.create({
      header: 'Cancel',
      message: `Are you sure you want to discard ${
        this.isEditing ? 'this category' : 'changes'
      }?`,
      buttons: [
        {
          text: `Discard ${this.isEditing ? 'category' : 'changes'}`,
          role: 'destructive',
          handler: () => this.navCtrl.navigateBack('/resources')
        },
        {
          text: `Continue ${this.isEditing ? 'creating' : 'editing'}`,
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  async showSavingModal() {
    const modal = await this.loadCtrl.create({
      message: `Saving ${this.isEditing ? 'new category' : 'changes'}`,
    });
    await modal.present();
    return modal;
  }

  async showSaveSuccessToast() {
    const modal = await this.toastCtrl.create({
      message: `Saved ${this.resourceForm.value.name} category successfuly`,
      duration: 3000
    });
    await modal.present();
  }

  async alertSaveFailed() {
    const alert = await this.alertCtrl.create({
      header: 'There seems to be a problem',
      message: "The category couldn't be saved for some reason, please try again.",
      buttons: [
        {
          text: `Continue ${this.isEditing ? 'creating' : 'editing'}.`,
          role: 'cancel'
        },
        {
          text: 'Retry',
          handler: () => this.onSubmit()
        },
      ],
    });
    await alert.present();
  }
}
