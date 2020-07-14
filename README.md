# Coronasafe Journal

A web application to aid users in generating their route maps.

### Requirements

<details>
  <summary>Ruby 2.7</summary>
  We recommend a managing tool like `[rbenv]` to install Ruby. After installing `rbenv`, you can run `rbenv install` from this repository root to install compatible ruby version.
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

### Setup

```bash
./bin/setup
```

### Dev server

```
foreman start -f Procfile.dev
```

## Contributing

Checkout the [issues](https://github.com/coronasafe/journal/issues) page. When you find one to your skill liking and skill level, please leave us a comment that you are taking it up. 

If you are new to open source, checkout [Open Source Guide](https://opensource.guide/how-to-contribute/)