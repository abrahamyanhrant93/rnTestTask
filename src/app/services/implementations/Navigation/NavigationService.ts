import {createNavigationContainerRef} from '@react-navigation/native';

import type {NavigationContainerRefWithCurrent} from '@react-navigation/core';
import type {
  EventListenerCallback,
  NavigationContainerEventMap,
} from '@react-navigation/native';

/** React-navigation related service to subscribe and handle navigation events. */
export class NavigationService {
  private previousRouteName: string | undefined;
  private currentRouteName: string | undefined;
  public ref: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;

  constructor() {
    this.ref = createNavigationContainerRef();
    this.ref.addListener('state', this.onStateChange);
  }

  onStateChange: EventListenerCallback<NavigationContainerEventMap, 'state'> =
    () => {
      if (this.ref.isReady()) {
        this.previousRouteName = this.currentRouteName;
        this.currentRouteName = this.ref.getCurrentRoute()?.name;
      }
    };
}
