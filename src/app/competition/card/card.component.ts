import { Component, OnInit, Input } from '@angular/core';
import { Competition } from '..';

@Component({
    selector: 'app-comp-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() info: Competition | undefined;

    constructor() { }

    ngOnInit(): void {
    }

}
