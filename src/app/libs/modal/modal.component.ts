import { Component, ElementRef, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private elementRef: ElementRef<Dialog>) {
    this.nativeElement = this.elementRef.nativeElement
  }

  ngOnInit() {}

  nativeElement: Dialog

  private visible: boolean = false

  private defaultOptions() {
    return {
      header: '',
      message: '',
      buttons: []
    }
  }

  options = this.defaultOptions()

  get isVisible() {
    return this.visible
  }

  async open(options = this.defaultOptions()) {
    if (this.isVisible) {
      console.warn('A previous modal is still open')
      return
    }

    this.visible = true

    Object.assign(this.options, options)

    this.nativeElement.appendTo(document.body)
  }

  close() {

  }

}
