# mailtrap-client

[![Build Status](https://travis-ci.org/zuffik/mailtrap-client.svg?branch=master)](https://travis-ci.org/zuffik/mailtrap-client)

Wrapper around [Mailtrap api](https://mailtrap.docs.apiary.io/) for javascript.
Added polling for messages as _rxjs observer_.

## Installation

`npm add mailtrap-client`

or

`yarn add mailtrap-client`

Package contains typescript definitions so there is no need to install extra `@types` package.

## Usage

Example:

```typescript
import {MailtrapClient} from 'mailtrap-client';
// or
// const {MailtrapClient} = require('mailtrap-client');

const client = new MailtrapClient(
    'your_api_key'
);
const messages = await client.messages.getMessages(123);
```

Mailtrap client contains almost same structure as mailtrap api described in [docs](https://mailtrap.docs.apiary.io/).

| Valid client properties |
|-------------------------|
| `user`                  |
| `companies`             |
| `inboxes`               |
| `sharedInboxes`         |
| `messages`              |
| `corsDomains`           |
