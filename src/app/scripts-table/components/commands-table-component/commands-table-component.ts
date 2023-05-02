import {Component, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Command} from '../../interfaces/command.model';
import {CommandService} from '../../services/command.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {CommandCreateRequest} from "../../interfaces/commandCreateRequest.model";
import {FileUpload} from "primeng/fileupload";


@Component({
  selector: 'app-commands-table-component',
  templateUrl: './commands-table-component.html',
  styleUrls: ['./commands-table-component.scss']
})
export class CommandsTableComponent implements OnInit {

  @ViewChild('iconUpload') fileUpload: any;
  @ViewChild('scriptUpload') scriptUpload: any;
  @ViewChild('requirementsFile') requirementsFile: any;

  marketplaceFlag = false;

  commandDialog: boolean;

  commands: Command[];

  command: Command;

  selectedCommands: Command[];
  acceptedScripts: string = ".js, .py";

  submitted: boolean;
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

  constructor(private commandService: CommandService, private messageService: MessageService, private confirmationService: ConfirmationService,) {
  }

  ngOnInit() {
    this.commandService.getUserCommands().subscribe(data => {
      this.commands = data;
    }, error => console.error(error));
  }

  openNew() {
    this.command = {
      parameters: ['', '', '', ''],
      patterns: ['', '', '', ''],
      patternsNumber: 1,
    };
    this.submitted = false;
    this.commandDialog = true;

    setTimeout(() => {
      document.querySelector<HTMLInputElement>('.parametersNumber .p-inputnumber-input').disabled = true;
    }, 1000);
  }

  deleteSelectedCommands() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected commands?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commands = this.commands.filter(val => !this.selectedCommands.includes(val));
        this.selectedCommands = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Commands Deleted', life: 3000});
      }
    });
  }

  editCommand(command: Command) {
    this.command = {...command};
    this.commandDialog = true;
  }

  deleteCommand(command: Command) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + command.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commands = this.commands.filter(val => val.id !== command.id);
        this.command = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Command Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.commandDialog = false;
    this.submitted = false;
    this.command = {};
  }

    onCreateCommand() {
      this.submitted = true;

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
        patternsNumber: this.command.patternsNumber
      };


      this.commandService.createCommand(commandCreateRequest).subscribe(data => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Command Created', life: 3000});
        this.commandDialog = false;
        this.command = {};
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Command Not Created', life: 3000});
      });



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


  onClearSelectedFile(fileUpload: FileUpload, fileName: string) {
    fileUpload.clear();
    this.messageService.add({severity: 'info', summary: fileName + ' Cleared', detail: ''});
  }


  openMarketplaceDialog() {
    this.marketplaceFlag = true;
  }


  closeMarketplace() {
    this.marketplaceFlag = false;
  }


  onParametersStateChange(value: number) {
    for (let i = value; i < 4; i++) {
      this.command.parameters[i] = '';
    }
  }

  onPatternsStateChange(value: number) {
    for (let i = value; i < 4; i++) {
      this.command.patterns[i] = '';
    }
  }
}
