import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SttService} from "../../services/stt/stt.service";
import {Subscription} from "rxjs";
import {TtsService} from "../../services/tts/tts.service";
import {ElectronService} from "../../../core/services";
import {RasaSocketService} from "../../services/rasa/rasa.socket/rasa-socket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  messages = [];
  transcribedSubscription: Subscription;

  ttsAudioSubscription: Subscription;

  @ViewChild('audioElement') audioElement: ElementRef<HTMLAudioElement>;
  @ViewChild('messagesContent') messagesContent: ElementRef<HTMLElement>;
  isRecording;


  constructor(private elementRef: ElementRef,
              private sttService: SttService,
              private ttsService: TtsService,
              private rasaSocketService: RasaSocketService,
              private electronService: ElectronService) {
  }

  updateScrollbar() {
    setTimeout(() => {
      let chat = this.messagesContent.nativeElement;
      chat.scrollTop = chat.scrollHeight + 100;
    }, 100);

  }

  ngOnInit(): void {
    this.transcribedSubscription = this.sttService.getTranscriptObservable().subscribe({
      next: (msg: string) => {
        this.addUserMessage(msg);
      }
    });

    this.ttsAudioSubscription = this.ttsService.getAudioObservable().subscribe({
      next: (audio: string | Uint8Array) => {
        this.playAudio(audio);
      }
    });

    this.rasaSocketService.receiveMessage((data: any) => {
      this.addBotMessage(data.text);
      this.electronService.runCommand(data);

      console.log("rasa responded with:  ", data);
    });
  }

  ngAfterViewInit(): void {
    this.greetUser();
  }

  @HostListener('click', ['$event']) onClick(event) {
    if (event.target.classList.contains('message-submit')) {
      this.addUserMessageFromInput();
    }
  }

  @HostListener('document:keydown', ['$event']) handleKeydown(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.addUserMessageFromInput();
      event.preventDefault();
      return false;
    }
  }

  addBotMessage(message: string) {
    this.messages.push({message, personal: false});
    this.updateScrollbar();
    this.speak(message);
  }

  addUserMessage(message: string) {
    this.messages.push({message: message, personal: true});
    this.rasaSocketService.sendMessage(message);
    this.updateScrollbar();
  }

  addUserMessageFromInput() {
    let msg = (document.querySelector('.message-input') as HTMLInputElement).value;
    if (msg.trim() === '') {
      return false;
    }
    this.addUserMessage(msg);
    this.rasaSocketService.sendMessage(msg);

    (document.querySelector('.message-input') as HTMLInputElement).value = '';
  }

  ngOnDestroy(): void {
    this.transcribedSubscription.unsubscribe();
  }

  // TODO: update to use the user's name
  greetUser() {
    this.addBotMessage('Hi, I\'m your personal assistant. How can I help you?');
  }

  playAudio(audio: string | Uint8Array) {
    this.audioElement.nativeElement.src = URL.createObjectURL(new Blob([audio], {type: 'audio/wav'}));
    this.audioElement.nativeElement.play();
  }

  speak(text: string) {
    this.ttsService.tts(text);
  }

  recordingState(isRecording: boolean) {
    this.isRecording = isRecording;
  }

  recorderOutput($event: Blob) {
    this.sttService.sendAudioBlob($event);
  }
}
