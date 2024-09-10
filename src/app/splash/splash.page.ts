import { Component, ViewChild,ElementRef } from '@angular/core';
import { Router} from '@angular/router';
import {  AfterViewInit} from '@angular/core';
import {Gesture, GestureController} from '@ionic/angular';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage{
  @ViewChild('swipeElement', { static: false }) swipeElement!: ElementRef;

  constructor(private router:Router, private gestureCtrl:GestureController) { }

  ngAfterViewInit() {
   this.createSwipeUpGesture();
  }

  createSwipeUpGesture() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.swipeElement.nativeElement,
      gestureName: 'swipe-up',
      onMove: (ev) => {
        if (ev.deltaY < 0){ 
          this.onSwipeUp();
        }
      },
    });

    gesture.enable();
  }

  onSwipeUp() {
    // Acción al detectar el swipe up
   this.router.navigate(['/login']);
  }
}
