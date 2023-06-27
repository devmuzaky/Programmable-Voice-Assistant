import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {CommandService} from "../../../services/command.service";
import {FileUpload} from "primeng/fileupload";
import {CommandEditInfoDTO} from "../../../interfaces/CommandEditInfoDTO";

@Component({
  selector: 'app-edit-command-form',
  templateUrl: './edit-command-form.component.html',
  styleUrls: ['./edit-command-form.component.scss']
})
export class EditCommandFormComponent implements OnInit {
  @Input() commandEditInfoDTO: CommandEditInfoDTO;
  @Output() closeForm = new EventEmitter<void>();

  scriptType = [{
    label: '.py', value: '.py'
  }, {
    label: '.js', value: '.js'
  }];
  status = [{
    label: 'Public', value: 'public'
  }, {
    label: 'Private', value: 'private'
  }];
  acceptedScripts: string = ".js, .py";
  submitted: boolean;
  parametersNumber: number = 0;
  patternsNumber: number = 1;

  constructor(private messageService: MessageService, private commandService: CommandService) {
  }

  ngOnInit(): void {
    this.parametersNumber = this.commandEditInfoDTO.parameters.length;
    this.patternsNumber = this.commandEditInfoDTO.patterns.length;
  }

  // file management
  onClearSelectedFile(fileUpload: FileUpload, fileName: string) {
    fileUpload.clear();
    this.messageService.add({severity: 'info', summary: fileName + ' Cleared', detail: ''});
  }

  // parameters and patterns
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

  // TODO: refactor this
  onEditCommand() {

  }
}
