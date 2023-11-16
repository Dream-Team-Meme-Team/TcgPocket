type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private subscribers: {
    [event: string]: { id: number; callback: EventCallback }[];
  } = {};
  private nextSubscriptionId = 1;

  subscribe<T>(event: string, callback: EventCallback<T>): number {
    const id = this.nextSubscriptionId++;
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push({ id, callback });
    return id;
  }

  unsubscribe(event: string, id: number): void {
    const subscribers = this.subscribers[event];
    if (subscribers) {
      this.subscribers[event] = subscribers.filter(
        (subscriber) => subscriber.id !== id
      );
    }
  }

  publish<T>(event: string, data: T): void {
    const callbacks = this.subscribers[event] || [];
    callbacks.forEach((callback) => callback.callback(data));
  }
}

const eventBus = new EventBus();

export default eventBus;
