import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Toast } from '../../models/Toast';
// import { trigger, state, style, transition, animate } from '@angular/animations';     

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})

// animations: [
//   trigger('fadeInOut', [
//     state('void', style({
//       opacity: 0,
//       transform: 'translateY(-20px)'
//     })),
//     transition(':enter', [
//       animate(300, style({
//         opacity: 1,
//         transform: 'translateY(0)'
//       }))
//     ]),
//     transition(':leave', [
//       animate(300, style({
//         opacity: 0,
//         transform: 'translateY(-20px)'
//       }))
//     ])
//   ])
// ]   

export class ToasterComponent {


  @Input() toast!: Toast;
  @Input() onClose!: () => void;

  close(): void {
    this.onClose();
  }

}
