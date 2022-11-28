import {
  ComponentFactoryResolver,
  ApplicationRef,
  Injector
} from '@angular/core';
import {
  ComponentType,
  ComponentPortal,
  DomPortalOutlet
} from '@angular/cdk/portal';
import { AppComponentFactoryResolver, AppInjector, AppRef } from '../app.component';


export class DynamicComponentsService<T> {

  constructor(component: ComponentType<T>, hostElement = document.body) {
    this.appRef = AppRef
    this.injector = AppInjector
    this.componentFactoryResolver = AppComponentFactoryResolver

    this.componentPortal = new ComponentPortal(component)

    this.elementPortalHost = new DomPortalOutlet(
      hostElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    )
  }

  private static isReady = false

  static readyCallbak: () => void = () => {
    this.isReady = true
  }

  static waitForReady() {
    return new Promise(resolve => {
      if (this.isReady) {
        resolve(undefined)
        return
      }

      this.readyCallbak = () => {
        this.isReady = true

        resolve(undefined)
      }
    })
  }

  private componentPortal: ComponentPortal<T>

  private elementPortalHost: DomPortalOutlet

  private appRef: ApplicationRef
  private injector: Injector
  private componentFactoryResolver: ComponentFactoryResolver

  createAndAttachInstance() {
    const ref = this.elementPortalHost.attach(this.componentPortal)
    const instance = ref.instance

    return instance
  }

  detachInstance() {
    this.elementPortalHost.detach()
  }
}
