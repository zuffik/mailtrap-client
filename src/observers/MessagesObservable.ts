import { MessagesEndpoint } from '../api/MessagesEndpoint';
import { Observable } from 'rxjs';
import { Message, MessagesObservableOptions } from 'mailtrap-client';
import { Subscriber } from 'rxjs/internal/Subscriber';

export class MessagesObservable {
  private interval?: number;
  private readonly pollInterval: number;
  private readonly date: Date;
  private readonly autoStart: boolean;
  private readonly observable: Observable<Message[]>;
  private subscriber?: Subscriber<Message[]>;

  constructor(
    private readonly messages: MessagesEndpoint,
    private readonly idInbox: number,
    { pollInterval = 1000, date = new Date(), autoStart = false }: MessagesObservableOptions = {}
  ) {
    this.pollInterval = pollInterval;
    this.date = date;
    this.autoStart = autoStart;
    this.observable = new Observable<Message[]>((s) => (this.subscriber = s));

    if (this.autoStart) {
      this.start();
    }
  }

  public start(): void {
    this.interval = setInterval(() => this.poll(), this.pollInterval);
  }

  public stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private async poll(): Promise<void> {
    try {
      if (this.subscriber) {
        const messages = (await this.messages.getMessages(this.idInbox)).filter(
          (msg) => new Date(msg.created_at) >= this.date
        );
        this.subscriber.next(messages);
      }
    } catch (e) {
      this.stop();
      throw e;
    }
  }

  public subscribe(
    next?: (value: Message[]) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    return this.observable.subscribe(next, error, complete);
  }
}
