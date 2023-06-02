import { Component, OnInit } from '@angular/core';
import { Competition } from '../card/card.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public readonly competitions: readonly Readonly<Competition>[] = [
        { id: 1, name: "A", desc: "", imgUrl: "/assets/b.png" },
        { id: 2, name: "B", desc: "", imgUrl: "/assets/a.png" },
        { id: 3, name: "C", desc: "", imgUrl: "/assets/a.png" }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
