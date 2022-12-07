import { Component, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicComponentsService } from './services/dynamic-components.service';


export let AppInjector: Injector;
export let AppComponentFactoryResolver: ComponentFactoryResolver;
export let AppRef: ApplicationRef;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private router: Router,
  ) {
    DynamicComponentsService.readyCallbak()

    AppInjector = this.injector;
    AppComponentFactoryResolver = this.componentFactoryResolver
    AppRef = this.appRef
  }

  title = 'task-manager-administrator-app';

  goToUsers() {
    this.router.navigateByUrl('/users')
  }

}
