import {
  IHttpClient,
  Message,
  MessageAnalyzeResult,
  MessageAttachment,
  MessageHeaders,
  MessageOnlyResult,
  MessagesEndpoint as IMessagesEndpoint,
  MessagesObservable as IMessagesObservable,
  MessagesObservableOptions,
  MessageSpamReport,
} from 'mailtrap-client';
import { MessagesObservable } from '../observers/MessagesObservable';

export class MessagesEndpoint implements IMessagesEndpoint {
  constructor(private readonly http: IHttpClient) {}

  public async getMessages(idInbox: number): Promise<Message[]> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages`);
  }

  public async getMessage(idInbox: number, idMessage: number): Promise<Message> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages/${idMessage}`);
  }

  public async patchMessage(
    idInbox: number,
    idMessage: number,
    data: { message: Partial<Message> }
  ): Promise<Message> {
    return await this.http.request('PATCH', `/inboxes/${idInbox}/messages/${idMessage}`, data);
  }

  public async deleteMessage(idInbox: number, idMessage: number): Promise<Message> {
    return await this.http.request('DELETE', `/inboxes/${idInbox}/messages/${idMessage}`);
  }

  public async forwardMessage(
    idInbox: number,
    idMessage: number,
    data: { email: string }
  ): Promise<MessageOnlyResult> {
    return await this.http.request(
      'POST',
      `/inboxes/${idInbox}/messages/${idMessage}/forward`,
      data
    );
  }

  public async getMessageBody(
    idInbox: number,
    idMessage: number,
    type: 'html' | 'htmlsource' | 'txt' | 'raw' | 'eml'
  ): Promise<string> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages/${idMessage}/body.${type}`);
  }

  public async getMessageBodyEml(idInbox: number, idMessage: number): Promise<string> {
    return await this.getMessageBody(idInbox, idMessage, 'eml');
  }

  public async getMessageBodyHtml(idInbox: number, idMessage: number): Promise<string> {
    return await this.getMessageBody(idInbox, idMessage, 'html');
  }

  public async getMessageBodyHtmlSource(idInbox: number, idMessage: number): Promise<string> {
    return await this.getMessageBody(idInbox, idMessage, 'htmlsource');
  }

  public async getMessageBodyRaw(idInbox: number, idMessage: number): Promise<string> {
    return await this.getMessageBody(idInbox, idMessage, 'raw');
  }

  public async getMessageBodyTxt(idInbox: number, idMessage: number): Promise<string> {
    return await this.getMessageBody(idInbox, idMessage, 'txt');
  }

  public async getMessageHeaders(idInbox: number, idMessage: number): Promise<MessageHeaders> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages/${idMessage}/mail_headers`);
  }

  public async getMessageSpamReport(
    idInbox: number,
    idMessage: number
  ): Promise<MessageSpamReport> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages/${idMessage}/spam_report`);
  }

  public async getMessageAnalyze(
    idInbox: number,
    idMessage: number
  ): Promise<MessageAnalyzeResult> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages/${idMessage}/analyze`);
  }

  public async getMessageAttachment(
    idInbox: number,
    idMessage: number,
    idAttachment: number
  ): Promise<MessageAttachment> {
    return await this.http.request(
      'GET',
      `/inboxes/${idInbox}/messages/${idMessage}/attachments/${idAttachment}`
    );
  }

  public async getMessageAttachments(
    idInbox: number,
    idMessage: number
  ): Promise<MessageAttachment[]> {
    return await this.http.request('GET', `/inboxes/${idInbox}/messages/${idMessage}/attachments`);
  }

  public watch(idInbox: number, options: MessagesObservableOptions = {}): IMessagesObservable {
    return (new MessagesObservable(this, idInbox, options) as unknown) as IMessagesObservable;
  }
}
