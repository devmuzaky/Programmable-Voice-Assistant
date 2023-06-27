import {Component, Input} from '@angular/core';
import {Parameter} from "../../../../interfaces/parameter";

@Component({
  selector: 'app-parameter-field',
  templateUrl: './parameter-field.component.html',
  styleUrls: ['./parameter-field.component.scss']
})
export class ParameterFieldComponent {

  @Input() submitted: boolean;
  @Input() order: number;
  @Input() parameters: Parameter[];

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
