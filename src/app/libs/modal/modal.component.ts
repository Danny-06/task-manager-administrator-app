import { Component, OnInit, ElementRef } from '@angular/core';
import { DynamicComponentsService } from 'src/app/services/dynamic-components.service';


export async function openModal(options: ModalOptions) {
  await DynamicComponentsService.waitForReady()

  const dynamicComponentsService = new DynamicComponentsService(ModalComponent)

  const modalInstance = dynamicComponentsService.createAndAttachInstance()

  modalInstance.open(options)

  return new Promise(resolve => {
    modalInstance.detachCallback = () => {
      resolve(undefined)
      dynamicComponentsService.detachInstance()
    }
  })
}


interface ModalOptions {
  header?: string
  message?: string
  buttons?: {text: string, closeModal?: boolean, action?: (event?: Event) => void, type?: string}[]
}

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.nativeElement = this.elementRef.nativeElement
  }

  ngOnInit() {}

  detachCallback = () => {}

  nativeElement: HTMLElement

  private defaultOptions() {
    return {
      header: '',
      message: '',
      buttons: []
    }
  }

  options: ModalOptions = this.defaultOptions()

  async open(options: ModalOptions = this.defaultOptions()) {
    Object.assign(this.options, options)

    const closeHeaderButtonSelector = '.p-dialog-header-close'

    this.nativeElement.addEventListener('click', (event: any) => {
      if (!event.target?.matches(closeHeaderButtonSelector)) {
        return
      }

      this.detachCallback()
    })
  }

}
