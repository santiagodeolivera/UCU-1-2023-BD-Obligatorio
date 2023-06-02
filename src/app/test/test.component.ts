import { Component, OnInit } from '@angular/core';
import { Competition } from '../competition';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    public readonly competitions: readonly Readonly<Competition>[] = [
        { name: "A", desc: "" },
        { name: "B", desc: "" },
        { name: "C", desc: "" }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
