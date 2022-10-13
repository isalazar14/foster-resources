import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResourceService } from '../../resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit, OnDestroy {
  constructor(private resourceService: ResourceService, private route: ActivatedRoute) { }

  category: Observable<string>
  resourceId: Observable<string>

  ngOnInit() {
    this.category = this.route.paramMap.pipe(map(params => params.get('category')), tap(c => console.log('category', c)))
    this.resourceId = this.route.paramMap.pipe(map(params => params.get('resourceId')), tap(r => console.log('resourceId', r)))
  }

  ngOnDestroy(): void {
    console.log('resource component onDestroy')
  }

}
