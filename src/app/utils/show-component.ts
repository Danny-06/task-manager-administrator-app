import { ComponentType } from "@angular/cdk/portal";
import { DynamicComponentsService } from "../services/dynamic-components.service";


export class ShowComponent {

  static detachKey = Symbol('detach key')

  static async show<T>(component: ComponentType<T>): Promise<{instance: T, waitForDismiss: Promise<void>}> {
    await DynamicComponentsService.waitForReady()

    const dynamicComponentsService = new DynamicComponentsService<T>(component)

    const componentInstance = dynamicComponentsService.createAndAttachInstance()

    return {
      instance: componentInstance,
      waitForDismiss: new Promise(resolve => {
        Object.assign(componentInstance as any, {
          [this.detachKey]: () => {
            resolve()
            dynamicComponentsService.detachInstance()
          }
        })
      })
    }
  }

  static hide(instance: any) {
    instance[this.detachKey]()
  }

}
