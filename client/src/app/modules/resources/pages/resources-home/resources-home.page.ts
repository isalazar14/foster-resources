import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Resource } from '../../models/resource.model';
import { ResourceService } from '../../resource.service';

@Component({
  selector: 'app-resources-home',
  templateUrl: './resources-home.page.html',
  styleUrls: ['./resources-home.page.scss'],
})
export class ResourcesHomePage implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute
  ) {}

  resources: Observable<Resource[]>;

  ngOnInit() {
    this.resources = this.resourceService.db
      .fetchResources({
        limit: 5,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      .pipe
      // delay(1000),
      // tap(() => {
      //   this.isLoading = false;
      //   console.log('home init complete');
      // })
      ();
  }
}
