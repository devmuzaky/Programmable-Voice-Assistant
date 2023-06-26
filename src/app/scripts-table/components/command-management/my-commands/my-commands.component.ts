import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Command} from "../../../interfaces/command.model";

@Component({
    selector: 'app-my-commands',
    templateUrl: './my-commands.component.html',
    styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {

    @Input() selection: Command[];

    @Output() selectionChange = new EventEmitter<Command[]>();

    @Input() commands: Command[];

    @Input() editCommand: (command: Command) => void;

    @Input() deleteCommand: (command: Command) => void;

    constructor() {
    }

    ngOnInit(): void {
    }

}
