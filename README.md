# Coronasafe Journal

A web application to aid users in generating their route maps.

Build with Rails and React ❤️

### Requirements

<details>
  <summary>Ruby 2.7</summary>
  We recommend a managing tool like <a href="https://github.com/rbenv/rbenv">rbenv</a> to install Ruby. After installing `rbenv`, you can run `rbenv install` from this repository root to install compatible ruby version.
</details>

<details>
  <summary>Foreman</summary>
  Foreman is a task runner used in the Ruby ecosystem. After installing Ruby you can install it with `gem install foreman`
</details>

<details>
  <summary>PostgreSQL</summary>
  We use PostgreSQL for the database. Checkout <pre>config/database.yml.postgresql</pre> for default keys in use. 
  If you are on Mac, you can install Postgres with `brew install postgres`
</details>

<details>
  <summary>NodeJS</summary>
  We recommend using a version manager such as <a href="https://github.com/nvm-sh/nvm">NVM</a>. After install NVM, you can use any Node version higher than 12 to run the application. 
  <pre>nvm install 12</pre>
</details>

### Setup

```bash
./bin/setup
```

### Dev server

```
foreman start -f Procfile.dev
```

### Running Tests

API endpoints have test coverage.

`bundle exec rake test` will run the test suite.

### Containerization

Build image

1. Clone the repo.
1. Setup `config/master.key`.
1. `docker-compose build`.

Run

1. Setup env variables. (list in `config/docker-compose.yml`)
2. `docker-compose run web rake db:migrate`.
3. `docker-compose up`.
4. React app will be compiled at `public/packs`.

Video: [https://share.getcloudapp.com/Blu50Kl4](https://share.getcloudapp.com/Blu50Kl4)

### API Documentation

[https://github.com/coronasafe/journal/blob/develop/doc/api.md](https://github.com/coronasafe/journal/blob/develop/doc/api.md)

### Quick demo of how to use the basic APIs

1. [User Login](https://share.getcloudapp.com/8Lu7O4AR)
2. [Visits](https://share.getcloudapp.com/DOuA0W0Y)
3. [Admin](https://share.getcloudapp.com/geuwNk9P)

### Instructions for deployment

1. Run `rake db:seed`. 
2. Setup environment variables `ADMIN_LOGIN` && `ADMIN_PASSWORD`.
3. Schedule `CleanupOldDataJob.perform_now` to be run once every day, probably midnight.
4. Setup the OTP service AppKey as an environment variable `SMS_API_KEY`
5. Setup environment variable `RAILS_SERVE_STATIC_FILES` = `true`

## Contributing

Checkout the [issues](https://github.com/coronasafe/journal/issues) page. When you find one to your skill liking and skill level, please leave us a comment that you are taking it up. 

If you are new to open source, checkout [Open Source Guide](https://opensource.guide/how-to-contribute/)

You can contact us through issues or find us on Slack.

<a href="http://slack.coronasafe.in/">
  <img src="https://i.imgur.com/V7jxjak.png">
</a>

## License

This project is [MIT](https://github.com/coronasafe/journal/blob/master/LICENSE) licensed.
