import { DomainEvents } from '@server/shared/src/core/domain/events/DomainEvents';
import { IHandle } from '@server/shared/src/core/domain/events/IHandle';

import { UserLoggedInEvent } from '../domain/events/UserLoggedInEvent';

export class AfterUserLoggedIn implements IHandle<UserLoggedInEvent> {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.onUserLoggedInEvent.bind(this),
      UserLoggedInEvent.name
    );
  }

  private async onUserLoggedInEvent(event: UserLoggedInEvent): Promise<void> {
    const { user } = event;

    console.log('logged in', user);
  }
}
