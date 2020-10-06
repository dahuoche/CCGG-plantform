import {Component, OnDestroy, OnInit} from '@angular/core';
import {AudioRecordingService} from '../service/audio-recording.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AwsUploadService} from '../service/aws-upload.service';
import {MockInterviewService} from '../service/mock-interview.service';
import {AuthService} from "../service/auth.service";
import {forkJoin} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-mock-interview',
  templateUrl: './mock-interview.component.html',
  styleUrls: ['./mock-interview.component.css']
})
export class MockInterviewComponent implements OnInit, OnDestroy {
  isRecording = false;
  recordedTime;
  blobUrl;
  isMockInterviewQ = false;
  coding: boolean;
  description = '';
  ext_description = '';
  selectedFiles: FileList;
  q_number: number;
  private question_id: any;

  localUser;
  batch = '';
  focus = '';
  trainer = '';
  batchId = '';
  user_id = '';
  startMock = false;
  result = {};
  answer = {
    result: '',
    answer: '',
    audio: '',
    question: ''
  };
  answerCode = '';
  isAccepted = false;
  isFinished = false;
  isSubmitted = false;


  ngOnInit() {
    this.q_number = 0;
    this.authService.getUser().subscribe(res => {
      this.localUser = res;
      if (this.localUser['batch'] !== undefined) {
        this.batch = this.localUser['batch']['batch'];
        this.focus = this.localUser['batch']['focus'];
        this.trainer = this.localUser['batch']['trainer'];
        this.trainer = this.localUser['batch']['trainer'];
        this.batchId = this.localUser['batch']['_id'];
      }
      this.user_id = this.localUser['_id'];
      if(this.batchId !== '') {
        this.mockInterviewService.GetMockInterviewQuestion(this.batchId,1).subscribe((mockInterviewQuestion) => {
          this.isMockInterviewQ = !!mockInterviewQuestion
          if(mockInterviewQuestion){
            this.description = mockInterviewQuestion.description;
            this.ext_description = mockInterviewQuestion.extra_description;
            this.coding = mockInterviewQuestion.coding;
          }
        });
      }

      this.mockInterviewService.readMockResult(this.user_id).subscribe(res => {
        res.forEach(r => {
          if(r.result === 'pending' || r.result === 'succeed') {
            this.isFinished = true;
          }
        });
      });
    });
  }

  constructor(private audioRecordingService: AudioRecordingService,
              private sanitizer: DomSanitizer,
              private awsUploadService: AwsUploadService,
              private mockInterviewService: MockInterviewService,
              public authService: AuthService) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    this.isSubmitted = true;
    let time = new Date().getTime();
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.stopRecording(time);
      this.answer.answer = this.answerCode;
      this.answer.audio = 'https://ccgg-mock-interview-audios.s3.amazonaws.com/audio/'+'audio_' + time + '.mp3';
      this.answer.question =this.question_id;
      this.mockInterviewService.addMockAnswer(this.answer).subscribe();
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  nextQuestion() {
    if(this.startMock === false){
      this.result = {
        user: this.localUser._id,
        result: 'pending',
        date: new Date()
      };
      this.mockInterviewService.AddMockAnswerResult(this.result)
        .subscribe(res => {
          this.mockInterviewService.getMockAnswerResultID(res['date'], res['userID'])
            .subscribe(res1 => {
              this.answer.result = res1['_id'];
            })
        });
    }
    this.startMock = true;
    this.isSubmitted = false;
    // this.stopRecording();
    if(this.batchId !== '') {
      this.mockInterviewService.GetMockInterviewQuestion(this.batchId,++this.q_number).subscribe((mockInterviewQuestion) => {
        this.isMockInterviewQ = !!mockInterviewQuestion
        if(mockInterviewQuestion){
          this.description = mockInterviewQuestion.description;
          this.ext_description = mockInterviewQuestion.extra_description;
          this.coding = mockInterviewQuestion.coding;
          this.question_id = mockInterviewQuestion._id
          this.startRecording();
        }
      });
    }


  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.awsUploadService.uploadFile(file);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  Accept() {
    this.isAccepted = !this.isAccepted
  }
}
