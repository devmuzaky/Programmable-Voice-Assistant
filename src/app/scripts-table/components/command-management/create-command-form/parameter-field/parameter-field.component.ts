import {Component, Input} from '@angular/core';
import {Command} from "../../../../interfaces/command.model";

@Component({
  selector: 'app-parameter-field',
  templateUrl: './parameter-field.component.html',
  styleUrls: ['./parameter-field.component.scss']
})
export class ParameterFieldComponent {

  @Input() submitted: boolean;
  @Input() order: number;
  @Input() command: Command;

  parameterTypes = [
    {
      label: 'Date', value: 'date'
    },
    {
      label: 'Location', value: 'location'
    },
    {
      label: 'Number', value: 'number'
    }
  ];

}
