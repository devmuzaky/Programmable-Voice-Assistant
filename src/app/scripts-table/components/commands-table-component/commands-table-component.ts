import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Command} from '../../interfaces/command.model';
import {CommandService} from '../../services/command.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {CommandCreateRequest} from "../../interfaces/commandCreateRequest.model";


@Component({
  selector: 'app-commands-table-component',
  templateUrl: './commands-table-component.html',
  styleUrls: ['./commands-table-component.scss']
})
export class CommandsTableComponent implements OnInit {

  @ViewChild('iconUpload') fileUpload: any;
  @ViewChild('scriptUpload') scriptUpload: any;
  @ViewChild('requirementsFile') requirementsFile: any;

  @ViewChild('paramNum') paramNum: any;
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
    this.commandService.getCommands().subscribe(data => {
      this.commands = data;
    }, error => console.error(error));
  }

  openNew() {
    this.command = {
      parameters: ['', '', '', '', '']
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
      visibility: this.command.visibility,
      scriptType: this.command.scriptType,
      parameters: this.command.parameters,
      icon: this.command.icon,
      script: this.command.script,
      requirements: this.command.requirements

    }
    this.commandService.createCommand(commandCreateRequest).subscribe(data => {
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Command Created', life: 3000});
      console.log(data);
    }, error => {
      console.error(error)
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Command Not Created', life: 3000});

    });

    console.log(commandCreateRequest)

    this.commandDialog = false;
    this.command = {};

  }

  onUploadIcon($event: any) {
    this.command.icon = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Icon Uploaded', detail: ''});
  }

  onUploadScript($event: any) {
    this.command.script = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Script Uploaded', detail: ''});
  }

  onClearIconSelection() {
    this.fileUpload.clear();
    this.messageService.add({severity: 'info', summary: 'Icon Cleared', detail: ''});
  }

  onClearScriptSelection() {
    this.scriptUpload.clear();
    this.messageService.add({severity: 'info', summary: 'Script Cleared', detail: ''});
  }

  onUploadRequirementsFile($event: any) {
    this.command.requirements = $event.files[0];
    this.messageService.add({severity: 'info', summary: 'Requirements Uploaded', detail: ''});
  }

  onClearRequirementsSelection() {
    this.requirementsFile.clear();
    this.messageService.add({severity: 'info', summary: 'Requirements Cleared', detail: ''});
  }

  onStateChange() {
    this.command.parameters = ['', '', '', '', ''];
  }

  openMarketplaceDialog() {
    this.marketplaceFlag = true;
  }


  closeMarketplace() {
    this.marketplaceFlag = false;
  }


}
