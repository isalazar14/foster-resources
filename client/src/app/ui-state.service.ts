import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  constructor() {}

    private _isLoading = new BehaviorSubject<boolean>(null)

    get isLoading() { return this._isLoading.asObservable() }
    
    setLoading(isLoading: boolean) { return this._isLoading.next(isLoading) }
}
