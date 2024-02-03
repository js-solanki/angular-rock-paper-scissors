import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-rock-paper-scissors';

  totalMoves = 1;
  scores = {
    computer: 0,
    person: 0
  };

  computer: any = false;
  person: any = false;
  toastRef: any;
  choices = ['rock', 'paper', 'scissor'];

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.toastRef?.onHidden.subscribe(() => {
      this.reset();
    });
  }

  random() {
    return Math.floor(Math.random() * this.choices.length);
  }

  play(answer: any): void {
    const computer = this.choices[this.random() | 0];
    const match = computer + '_' + answer;
  
    if (this.totalMoves === 10) {
      return;
    }
  
    this.totalMoves++;
  
    switch (match) {
      case 'rock_paper':
      case 'paper_scissor':
      case 'scissor_rock':
        this.scores.person++;
        break;
      case 'paper_rock':
      case 'scissor_paper':
      case 'rock_scissor':
        this.scores.computer++;
        break;
      default:
        this.scores.computer++;
        this.scores.person++;
    }
  
    if (this.totalMoves === 10) {
      this.displayResult();
    }
  
    this.computer = computer;
    this.person = answer;
  }
  
  displayResult(): void {
    if (this.scores.computer === this.scores.person) {
      this.showResult('Match Draw');
    } else if (this.scores.computer > this.scores.person) {
      this.showResult('Computer won the match');
    } else {
      this.showResult('Congratulations! You won the match');
    }
  
    this.toastRef.onHidden.subscribe(() => {
      this.reset();
    });
  }
  
  showResult(message: string): void {
    this.toastRef = this.toastr.info(message, '', { closeButton: true, tapToDismiss: false });
  }

  reset() {
    this.computer = false;
    this.person = false;
    this.scores.computer = 0;
    this.scores.person = 0;
    this.totalMoves = 1;
  }
}
