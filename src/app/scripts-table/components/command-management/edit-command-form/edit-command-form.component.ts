import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {CommandService} from "../../../services/command.service";
import {FileUpload} from "primeng/fileupload";
import {CommandEditInfoDTO} from "../../../interfaces/CommandEditInfoDTO";
import {CommandEditRequest} from "../../../interfaces/commandEditRequest.model";

@Component({
  selector: 'app-edit-command-form',
  templateUrl: './edit-command-form.component.html',
  styleUrls: ['./edit-command-form.component.scss']
})
export class EditCommandFormComponent implements OnInit {
  @Input() initialCommandEditInfoDTO: CommandEditInfoDTO;
  @Output() closeForm = new EventEmitter<void>();

  scriptType = [
    {
      label: '---', value: ''
    },
    {
      label: '.py', value: '.py'
    },
    {
      label: '.js', value: '.js'
    }
  ];
  status = [
    {
      label: 'Public', value: 'public'
    }, {
      label: 'Private', value: 'private'
    }
  ];
  acceptedScripts: string = ".js, .py";
  submitted: boolean;
  parametersNumber: number = 0;
  patternsNumber: number = 1;
  commandEditInfoDTO: CommandEditInfoDTO;

  constructor(private messageService: MessageService, private commandService: CommandService) {
  }

  ngOnInit(): void {
    this.commandEditInfoDTO = this.copyCommandInitialValue()
    this.parametersNumber = this.commandEditInfoDTO.parameters.length;
    this.patternsNumber = this.commandEditInfoDTO.patterns.length;
  }

  onEditCommand() {
    this.submitted = true;
    const commandEditRequest: CommandEditRequest = {
      id: this.commandEditInfoDTO.id,
    };
    this.setUpdatedFields(commandEditRequest);
    console.log({commandEditRequest})
  }

  private setUpdatedFields(commandEditRequest: CommandEditRequest) {
    if (this.commandEditInfoDTO.name !== this.initialCommandEditInfoDTO.name) {
      commandEditRequest.name = this.commandEditInfoDTO.name;
    }

    if (this.commandEditInfoDTO.description !== this.initialCommandEditInfoDTO.description) {
      commandEditRequest.description = this.commandEditInfoDTO.description;
    }

    if (this.commandEditInfoDTO.parameters.length !== this.initialCommandEditInfoDTO.parameters.length) {
      commandEditRequest.parameters = this.commandEditInfoDTO.parameters;
    } else {
      for (let i = 0; i < this.commandEditInfoDTO.parameters.length; i++) {
        if (this.commandEditInfoDTO.parameters[i].name !== this.initialCommandEditInfoDTO.parameters[i].name || this.commandEditInfoDTO.parameters[i].type !== this.initialCommandEditInfoDTO.parameters[i].type || this.commandEditInfoDTO.parameters[i].order !== this.initialCommandEditInfoDTO.parameters[i].order) {
          commandEditRequest.parameters = this.commandEditInfoDTO.parameters;
          break;
        }
      }
    }

    if (this.commandEditInfoDTO.patterns.length !== this.initialCommandEditInfoDTO.patterns.length) {
      commandEditRequest.patterns = this.commandEditInfoDTO.patterns.map(pattern => pattern.syntax);
    } else {
      for (let i = 0; i < this.commandEditInfoDTO.patterns.length; i++) {
        if (this.commandEditInfoDTO.patterns[i].syntax !== this.initialCommandEditInfoDTO.patterns[i].syntax) {
          commandEditRequest.patterns = this.commandEditInfoDTO.patterns.map(pattern => pattern.syntax)
          break;
        }
      }
    }

    if (this.commandEditInfoDTO.state !== this.initialCommandEditInfoDTO.state) {
      commandEditRequest.visibility = this.commandEditInfoDTO.state;
    }

    if (this.commandEditInfoDTO.icon) {
      commandEditRequest.icon = this.commandEditInfoDTO.icon;
    }

    // the script, requirements, and type are optional, but one change the three should change
    if (this.commandEditInfoDTO.script || this.commandEditInfoDTO.requirements || this.commandEditInfoDTO.scriptType) {
      if (this.commandEditInfoDTO.script && this.commandEditInfoDTO.requirements && this.commandEditInfoDTO.scriptType) {
        commandEditRequest.script_data = {
          script: this.commandEditInfoDTO.script,
          requirements: this.commandEditInfoDTO.requirements,
          scriptType: this.commandEditInfoDTO.scriptType
        }
      }
    }
  }

  private copyCommandInitialValue() {
    return {
      id: this.initialCommandEditInfoDTO.id,
      name: this.initialCommandEditInfoDTO.name,
      description: this.initialCommandEditInfoDTO.description,
      state: this.initialCommandEditInfoDTO.state,
      icon: null,
      script: null,
      requirements: null,
      scriptType: '',
      parameters: this.initialCommandEditInfoDTO.parameters.map(parameter => {
        return {
          order: parameter.order, name: parameter.name, type: parameter.type
        }
      }),
      patterns: this.initialCommandEditInfoDTO.patterns.map(pattern => {
        return {
          syntax: pattern.syntax
        }
      })
    };
  }


  showScriptErrors(): boolean {
    if (this.commandEditInfoDTO.script || this.commandEditInfoDTO.requirements || this.commandEditInfoDTO.scriptType) {
      if (!(this.commandEditInfoDTO.script && this.commandEditInfoDTO.requirements && this.commandEditInfoDTO.scriptType)) {
        return true;
      }
    }
    return false;
  }

  onParametersStateChange(value: number) {
    for (let i = value; i < 4; i++) {
      this.commandEditInfoDTO.parameters[i]['name'] = '';
    }
  }

  onPatternsStateChange(value: number) {
    for (let i = value; i < 4; i++) {
      this.commandEditInfoDTO.patterns[i] = {
        syntax: '',
      };
    }
  }

  onUploadIcon($event: any) {
    this.commandEditInfoDTO.icon = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Icon Uploaded', detail: ''});
  }

  onUploadScript($event: any) {
    this.commandEditInfoDTO.script = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Script Uploaded', detail: ''});
  }

  onUploadRequirementsFile($event: any) {
    this.commandEditInfoDTO.requirements = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Requirements Uploaded', detail: ''});
  }

  onClearSelectedFile(fileUpload: FileUpload, fileName: string) {
    fileUpload.clear();
    this.messageService.add({severity: 'info', summary: fileName + ' Cleared', detail: ''});
  }
}
