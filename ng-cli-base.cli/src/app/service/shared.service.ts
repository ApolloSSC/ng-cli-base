import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { User } from '../model/model'

@Injectable()
export class SharedService {

    constructor() { }

    public currentUser: User;

    public triggerRefresh = new Subject<boolean>();

}
