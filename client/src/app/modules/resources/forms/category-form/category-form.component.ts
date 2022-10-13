import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { skip, take } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { ResourceService } from '../../resource.service';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}
  @Input() isNew: boolean;
  @Input() activeCategory: Observable<Category>;
  @Input() submitHandler: Function;
  // isLoading: Observable<boolean>
  activeCategorySub: Subscription

  categoryForm = this.fb.group({
    name: [''],
    description: [''],
    imageUrl: [''],
    suggestedDetails: this.fb.array([this.fb.control('')]),
  });

  ngOnInit(): void {
    this.populateFormIfEditing()
    // this.isLoading = this.resourceService.isLoading
  }

  ionViewWillEnter() {}

  ngOnDestroy(): void {
    if (this.activeCategorySub) this.activeCategorySub.unsubscribe()
  }

  get suggestedDetails() {
    return this.categoryForm.get('suggestedDetails') as FormArray;
  }

  populateFormIfEditing() {
    if (!this.isNew) {
      this.activeCategorySub = this.activeCategory?.subscribe({
        next: (category) => {
          // console.log('category form initial state:', category);

          // this.categoryForm.setValue(initialState as any)

          for (let key in category) {
            if (Array.isArray(category[key])) {
              let formArray = this.categoryForm.get(key) as FormArray;
              // console.log(formArray)
              formArray.clear();
              for (const item of category[key]) {
                // console.log(detail)
                formArray.push(this.fb.control(item));
              }
              formArray.push(this.fb.control(''));
            } else {
              this.categoryForm.get(key)?.setValue(category[key]);
            }
          }
        },
      });
    }
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
    this.submitHandler(cleanedForm);
  }

  getCleanForm() {
    return {
      name: this.categoryForm.value.name.trim(),
      description: this.categoryForm.value.description.trim(),
      imageUrl: this.categoryForm.value.imageUrl.trim(),
      suggestedDetails: this.categoryForm.value.suggestedDetails
        .filter((d) => d != '')
        .map((d) => d.trim()),
    };
  }

  resetForm() {
    this.categoryForm.reset();
  }

  async confirmCancel() {
    const alert = await this.alertCtrl.create({
      header: 'Cancel',
      message: `Are you sure you want to discard ${
        this.isNew ? 'this category' : 'changes'
      }?`,
      buttons: [
        {
          text: `Discard ${this.isNew ? 'category' : 'changes'}`,
          role: 'destructive',
          handler: () => this.navCtrl.navigateBack('/resources')
        },
        {
          text: `Continue ${this.isNew ? 'creating' : 'editing'}`,
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  async showSavingModal() {
    const modal = await this.loadCtrl.create({
      message: `Saving ${this.isNew ? 'new category' : 'changes'}`,
    });
    await modal.present();
    return modal;
  }

  async showSaveSuccessToast() {
    const modal = await this.toastCtrl.create({
      message: `Saved ${this.categoryForm.value.name} category successfuly`,
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
          text: `Continue ${this.isNew ? 'creating' : 'editing'}.`,
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
