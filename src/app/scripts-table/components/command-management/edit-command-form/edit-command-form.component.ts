import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {CommandService} from "../../../services/command.service";
import {FileUpload} from "primeng/fileupload";
import {CommandEditInfoDTO} from "../../../interfaces/CommandEditInfoDTO";
import {CommandEditRequest} from "../../../interfaces/commandEditRequest.model";
import {MyCommandService} from "../my-commands/my-command-service/my-command.service";

@Component({
  selector: 'app-edit-command-form',
  templateUrl: './edit-command-form.component.html',
  styleUrls: ['./edit-command-form.component.scss']
})
export class EditCommandFormComponent implements OnInit {
  @Input() initialCommandEditInfoDTO: CommandEditInfoDTO;
  @Output() closeForm = new EventEmitter<void>();
  loading: boolean = false;
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

  constructor(
    private messageService: MessageService,
    private commandService: CommandService,
    private myCommandService: MyCommandService
  ) {
  }

  ngOnInit(): void {
    this.commandEditInfoDTO = this.copyCommandInitialValue();

    this.parametersNumber = this.initialCommandEditInfoDTO.parameters.length;
    this.patternsNumber = this.initialCommandEditInfoDTO.patterns.length;
  }

  onEditCommand() {
    if (this.loading) return;
    this.submitted = true;
    this.loading = true;
    const commandEditRequest: CommandEditRequest = {
      id: this.commandEditInfoDTO.id,
    };
    this.setUpdatedFields(commandEditRequest);

    // TODO: handle submission and closing the form (look at the create)
    this.commandService.editCommand(commandEditRequest).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Command Edited Successfully',
        life: 3000
      });
      this.closeForm.emit();
      this.loading = false;

      this.myCommandService.fetchMyCommands();
    }, error => {
      this.messageService.add({severity: 'error', summary: `Error ${error.status}`, detail: error.message, life: 3000});
      this.loading = false;
    });
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

  private setUpdatedFields(commandEditRequest: CommandEditRequest) {
    if (this.commandEditInfoDTO.name !== this.initialCommandEditInfoDTO.name) {
      commandEditRequest.name = this.commandEditInfoDTO.name;
    }

    if (this.commandEditInfoDTO.description !== this.initialCommandEditInfoDTO.description) {
      commandEditRequest.description = this.commandEditInfoDTO.description;
    }
    const filterParameters = this.commandEditInfoDTO.parameters.filter(parameter => parameter.name !== "");
    if (filterParameters.length !== this.initialCommandEditInfoDTO.parameters.length) {
      commandEditRequest.parameters = filterParameters;
    } else {
      for (let i = 0; i < filterParameters.length; i++) {
        if (filterParameters[i].name !== this.initialCommandEditInfoDTO.parameters[i].name || filterParameters[i].type !== this.initialCommandEditInfoDTO.parameters[i].type || filterParameters[i].order !== this.initialCommandEditInfoDTO.parameters[i].order) {
          commandEditRequest.parameters = filterParameters;
          break;
        }
      }
    }
    const filteredPatterns = this.commandEditInfoDTO.patterns.filter(parameter => parameter.syntax !== "");
    if (filteredPatterns.length !== this.initialCommandEditInfoDTO.patterns.length) {
      commandEditRequest.patterns = filteredPatterns.map(pattern => pattern.syntax);
    } else {
      for (let i = 0; i < filteredPatterns.length; i++) {
        if (filteredPatterns[i].syntax !== this.initialCommandEditInfoDTO.patterns[i].syntax) {
          commandEditRequest.patterns = filteredPatterns.map(pattern => pattern.syntax)
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
    const command = {
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

    if (command.patterns.length !== 4) {
      for (let i = command.patterns.length; i < 4; i++) {
        command
          .patterns.push({syntax: ''});
      }

    }


    if (command.parameters.length !== 4) {
      for (let i = command.parameters.length; i < 4; i++) {
        command
          .parameters.push({name: '', type: '', order: i});
      }

    }

    return command;

  }
}
