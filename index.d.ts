declare module 'mailtrap-client' {
  export type HttpMethodWithoutBody = 'GET' | 'DELETE';
  export type HttpMethodWithBody = 'PATCH' | 'POST' | 'PUT';
  export type ResponseType = 'json' | 'text';
  export type HttpMethod = HttpMethodWithoutBody | HttpMethodWithBody;

  export type HttpProvider = (
    method: HttpMethod,
    url: string,
    headers: Record<string, any>,
    responseType: ResponseType,
    data?: any
  ) => Promise<any>;
  export const FetchProvider: HttpProvider;

  export class MailtrapClient {
    public readonly user: UserEndpoint;
    public readonly companies: CompaniesEndpoint;
    public readonly inboxes: InboxesEndpoint;
    public readonly sharedInboxes: SharedInboxesEndpoint;
    public readonly messages: MessagesEndpoint;
    public readonly corsDomains: CorsDomainsEndpoint;

    private readonly apiKey: string;

    constructor(apiKey: string, httpClient?: HttpProvider);
  }

  export interface MessagesObservableOptions {
    pollInterval?: number;
    date?: Date;
    autoStart?: boolean;
  }

  export interface MessagesObservable {
    new (
      messages: MessagesEndpoint,
      idInbox: number,
      options: MessagesObservableOptions
    ): MessagesObservable;

    start(): void;

    stop(): void;

    subscribe(
      next?: (value: Message[]) => void,
      error?: (error: any) => void,
      complete?: () => void
    ): void;
  }

  /**
   * Endpoints
   */
  export interface UserEndpoint {
    getUser(): Promise<User>;

    patchUser(data: { user: Partial<User> }): Promise<User>;

    patchUserResetApiToken(): Promise<User>;
  }

  export interface CompaniesEndpoint {
    getCompanies(): Promise<Company[]>;

    getCompany(idCompany: number): Promise<Company>;

    patchCompany(idCompany: number, data: { company: Partial<Company> }): Promise<Company>;

    deleteCompany(idCompany: number): Promise<Company>;

    createCompanyInbox(idCompany: number, data: { inbox: Partial<Inbox> }): Promise<Inbox>;

    getSharedUsers(idCompany: number): Promise<SharedUser[]>;

    getSharedUser(idCompany: number, idSharedUser: number): Promise<SharedUser>;

    deleteSharedUser(idCompany: number, idSharedUser: number): Promise<SharedUser>;
  }

  export interface InboxesEndpoint {
    getInboxes(): Promise<Inbox[]>;

    getInbox(idInbox: number): Promise<Inbox>;

    patchInbox(idInbox: number, data: { inbox: Partial<Inbox> }): Promise<Inbox>;

    deleteInbox(idInbox: number): Promise<Inbox>;

    cleanInbox(idInbox: number): Promise<Inbox>;

    markAllAsReadInInbox(idInbox: number): Promise<Inbox>;

    resetInboxCredentials(idInbox: number): Promise<Inbox>;

    resetInboxEmailUsername(idInbox: number): Promise<Inbox>;

    toggleInboxEmailUsername(idInbox: number): Promise<Inbox>;

    getForwardRules(idInbox: number): Promise<ForwardRule[]>;

    createForwardRule(idInbox: number): Promise<ForwardRule>;

    getForwardRule(idInbox: number, idForwardRule: number): Promise<ForwardRule>;

    patchForwardRule(
      idInbox: number,
      idForwardRule: number,
      data: { forward_rule: Partial<ForwardRule> }
    ): Promise<ForwardRule>;

    deleteForwardRule(idInbox: number, idForwardRule: number): Promise<ForwardRule>;

    getInboxUsers(idInbox: number): Promise<InboxUser[]>;

    getInboxUser(idInbox: number, idInboxUser: number): Promise<InboxUser>;

    deleteInboxUser(idInbox: number, idInboxUser: number): Promise<InboxUser>;
  }

  export interface SharedInboxesEndpoint {
    getSharedInboxes(): Promise<SharedInbox[]>;

    deleteSharedInbox(id: number): Promise<SharedInbox>;
  }

  export interface MessagesEndpoint {
    getMessages(idInbox: number): Promise<Message[]>;

    getMessage(idInbox: number, idMessage: number): Promise<Message>;

    patchMessage(
      idInbox: number,
      idMessage: number,
      data: { message: Partial<Message> }
    ): Promise<Message>;

    deleteMessage(idInbox: number, idMessage: number): Promise<Message>;

    forwardMessage(
      idInbox: number,
      idMessage: number,
      data: { email: string }
    ): Promise<MessageOnlyResult>;

    getMessageBody(
      idInbox: number,
      idMessage: number,
      type: 'html' | 'htmlsource' | 'txt' | 'raw' | 'eml'
    ): Promise<string>;

    // same as above but without the last parameter
    getMessageBodyHtml(idInbox: number, idMessage: number): Promise<string>;

    getMessageBodyHtmlSource(idInbox: number, idMessage: number): Promise<string>;

    getMessageBodyTxt(idInbox: number, idMessage: number): Promise<string>;

    getMessageBodyRaw(idInbox: number, idMessage: number): Promise<string>;

    getMessageBodyEml(idInbox: number, idMessage: number): Promise<string>;

    getMessageHeaders(idInbox: number, idMessage: number): Promise<MessageHeaders>;

    getMessageSpamReport(idInbox: number, idMessage: number): Promise<MessageSpamReport>;

    getMessageAnalyze(idInbox: number, idMessage: number): Promise<MessageAnalyzeResult>;

    getMessageAttachments(idInbox: number, idMessage: number): Promise<MessageAttachment[]>;

    getMessageAttachment(
      idInbox: number,
      idMessage: number,
      idAttachment: number
    ): Promise<MessageAttachment>;

    watch(idInbox: number, options?: MessagesObservableOptions): MessagesObservable;
  }

  export interface CorsDomainsEndpoint {
    getCorsDomains(): Promise<CorsDomain[]>;

    getCorsDomain(idCorsDomain: number): Promise<CorsDomain>;

    // something suspicious here
    createCorsDomain(idCorsDomain: number): Promise<CorsDomain>;

    patchCorsDomain(
      idCorsDomain: number,
      data: { cors_domain: Partial<CorsDomain> }
    ): Promise<CorsDomain>;

    deleteCorsDomain(idCorsDomain: number): Promise<CorsDomain>;
  }

  /**
   * Common types
   */
  export interface MessageOnlyResult {
    message: string;
  }

  /**
   * Message types
   */
  export interface MessageReport {
    name: string;
    url: string;
    in_black_list: false;
  }

  export interface MessageBlacklistReportInfo {
    result: string;
    domain: string;
    ip: string;
    report: MessageReport[];
  }

  export interface Message {
    id: number;
    inbox_id: number;
    subject: string;
    sent_at: string;
    from_email: string;
    from_name: string;
    to_email: string;
    to_name: string;
    email_size: number;
    html_body_size: number;
    text_body_size: number;
    is_read: true;
    created_at: string;
    updated_at: string;
    human_size: string;
    html_path: string;
    html_source_path: string;
    txt_path: string;
    raw_path: string;
    download_path: string;
    blacklists_report_info: MessageBlacklistReportInfo;
  }

  export interface MessageAttachment {
    id: number;
    message_id: number;
    filename: string;
    attachment_type: string;
    content_type: string;
    content_id: string;
    transfer_encoding: string;
    attachment_size: number;
    created_at: string;
    updated_at: string;
    attachment_human_size: string;
    download_path: string;
  }

  export interface MessageHeaders {
    headers: Record<string, string | number | null>;
  }

  export interface MessageSpamReportDetail {
    Pts: string;
    RuleName: string;
    Description: string;
  }

  export interface MessageSpamReport {
    report: {
      ResponseCode: number;
      ResponseMessage: string;
      Score: number;
      Spam: boolean;
      Threshold: number;
      Details: MessageSpamReportDetail[];
    };
  }

  export interface MessageAnalyzeResultError {
    error_line: number;
    rule_name: string;
    email_clients: {
      web?: string[];
      desktop?: string[];
      mobile?: string[];
    };
  }

  export interface MessageAnalyzeResult {
    report: {
      status: string;
      errors: MessageAnalyzeResultError[];
    };
  }

  /**
   * User types
   */
  export interface User {
    id: number;
    name: string;
    email: string;
    api_token: string;
    gravatar_img: string;
    created_at: string;
    timezone: string;
    timezone_in_int: number;
  }

  export interface InboxUser {
    id: number;
    inbox_id: number;
    created_at: string;
    updated_at: string;
    email: string;
  }

  export interface SharedUser {
    id: number;
    user_id: number;
    role: string;
    is_owner: boolean;
    name: string;
    email: string;
  }

  /**
   * Inbox types
   */
  export interface Inbox {
    id: number;
    company_id: number;
    name: string;
    domain: string;
    username: string;
    password: string;
    status: string;
    max_size: number;
    emails_count: number;
    emails_unread_count: number;
    email_username: string;
    email_username_enabled: boolean;
    email_domain: string;
    last_message_sent_at: string;
    sent_messages_count: number;
    forwarded_messages_count: number;
    pop3_domain: string;
    smtp_ports: number[];
    pop3_ports: number[];
    has_inbox_address: boolean;
  }

  export interface SharedInbox {
    id: number;
    company_id: number;
    name: string;
    domain: string;
    username: string;
    password: string;
    status: string;
    max_size: number;
    emails_count: number;
    emails_unread_count: number;
    last_message_sent_at: string;
    sent_messages_count: number;
    forwarded_messages_count: number;
    company_name: string;
  }

  /**
   * Company/Project types
   */
  export interface Company {
    id: number;
    name: string;
    is_owner: boolean;
    share_link: string;
    ext_id: string;
    inboxes: Inbox[];
  }

  export type Project = Company;

  /**
   * Forward rules
   */
  export interface ForwardRule {
    id: number;
    inbox_id: number;
    forward_type: string;
    forward_value: string;
  }

  /**
   * Cors domain types
   */
  export interface CorsDomain {
    id: number;
    user_id: number;
    domain: string;
  }
}
