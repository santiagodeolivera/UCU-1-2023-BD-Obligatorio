import { Component, OnInit } from '@angular/core';
import { Competition } from '../competition';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    public readonly competitions: readonly Readonly<Competition>[] = [
        { name: "A", desc: "", imgUrl: "/assets/b.png" },
        { name: "B", desc: "", imgUrl: "/assets/a.png" },
        { name: "C", desc: "", imgUrl: "/assets/a.png" }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
