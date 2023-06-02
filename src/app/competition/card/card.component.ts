import { Component, OnInit, Input } from '@angular/core';

// Incomplete
export interface Competition {
    id: number,
    name: string,
    desc: string,
    imgUrl: string,
    imgAlt?: string
}

@Component({
    selector: 'app-comp-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() info: Competition | undefined;

    get link(): string {
        return this.info ? ("/competitions/" + this.info.id) : "#";
    }

    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {

    }

}
