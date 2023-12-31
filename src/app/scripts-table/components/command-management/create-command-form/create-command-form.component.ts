import {Component, EventEmitter, NgZone, Output} from '@angular/core';
import {Command} from "../../../interfaces/command.model";
import {FileUpload} from "primeng/fileupload";
import {CommandCreateRequest} from "../../../interfaces/commandCreateRequest.model";
import {MessageService} from "primeng/api";
import {CommandService} from "../../../services/command.service";
import {MyCommandService} from "../my-commands/my-command-service/my-command.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-create-command-form',
  templateUrl: './create-command-form.component.html',
  styleUrls: ['./create-command-form.component.scss']
})
export class CreateCommandFormComponent {
  @Output() closeForm = new EventEmitter<void>();
  loading: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  command: Command = {
    name: '',
    description: '',
    visibility: '',
    icon: null,
    script: null,
    requirements: null,
    scriptType: '',
    parameters: [
      {
        name: '',
        type: '',
        order: 0
      },
      {
        name: '',
        type: '',
        order: 1
      },
      {
        name: '',
        type: '',
        order: 2
      },
      {
        name: '',
        type: '',
        order: 3
      }
    ],
    patterns: ['', '', '', ''],
    patternsNumber: 1,
  };

  scriptType = [{
    label: '.py', value: '.py'
  }, {
    label: '.js', value: '.js'
  }];
  status = [{
    label: 'Public', value: 'Public'
  }, {
    label: 'Private', value: 'Private'
  }];


  acceptedScripts: string = ".js, .py";
  submitted: boolean;


  constructor(
    private zone: NgZone,
    private messageService: MessageService,
    private commandService: CommandService,
    private myCommandService: MyCommandService
  ) {}

  onCreateCommand() {
    if (this.submitted) return;

    this.submitted = true;
    this.loading.next(true);
    this.zone.run(() => {
        // fix for delay re-rendering in electron
      }
    );
    const commandCreateRequest: CommandCreateRequest = {
      name: this.command.name,
      description: this.command.description,
      parameters: this.command.parameters,
      patterns: this.command.patterns,
      script_data: {
        script: this.command.script,
        requirements: this.command.requirements,
        scriptType: this.command.scriptType
      },
      icon: this.command.icon,
      patternsNumber: this.command.patternsNumber,
      visibility: this.command.visibility
    };

    this.commandService.createCommand(commandCreateRequest).subscribe(_ => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Command Created',
          life: 3000
        });

        this.closeForm.emit();
        this.command = {};
        this.myCommandService.fetchMyCommands();
        this.loading.next(false);
        this.submitted = false;

      }, _ => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Command Not Created', life: 3000});
        this.loading.next(false);
        this.submitted = false;
      }
    );
  }

  // file management
  onClearSelectedFile(fileUpload: FileUpload, fileName: string) {
    fileUpload.clear();
    this.messageService.add({severity: 'info', summary: fileName + ' Cleared', detail: ''});
  }

  // parameters and patterns
  onParametersStateChange(value: number) {
    for (let i = value; i < 4; i++) {
      this.command.parameters[i]['name'] = '';
    }
  }

  onPatternsStateChange(value: number) {
    for (let i = value; i < 4; i++) {
      this.command.patterns[i] = '';
    }
  }

  onUploadIcon($event: any) {
    this.command.icon = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Icon Uploaded', detail: ''});
  }

  onUploadScript($event: any) {
    this.command.script = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Script Uploaded', detail: ''});
  }

  onUploadRequirementsFile($event: any) {
    this.command.requirements = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Requirements Uploaded', detail: ''});
  }
}
