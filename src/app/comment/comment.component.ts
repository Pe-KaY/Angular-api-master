import { Component, Input } from '@angular/core';
import { APIService } from '../services/api.service';
import { comment } from '../the-interfaces';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  constructor(public api: APIService) {}

  status!: boolean;

  @Input('comment') comment!: comment;

  ngOnInit(): void {
    this.status = this.randomStatus();
  }

  randomStatus() {
    return Math.random() < 0.5;
  }
}
