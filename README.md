# SalesLoft Development Interview Starter Kit

This application is a jumping off point for the SalesLoft Development Interview,
its designed to cut out boilerplate so you can get straight to coding.

**For full-stack submissions**: Please build both a Rails back-end and a React front-end. Think carefully about the responsibilities of each component.

Included in the package.

- Rails 5 Application
- Webpack Front-end build system
- React
- Redux

## Getting Started

### Running natively

1.) Make sure your ruby environment is at least 2.4.1
```
ruby --version
```
2.) Make sure your node version is above 8.5.0
```
node --version
```
3.) bundle install
```
gem install bundle
bundle install
```
4.) npm install
```
npm install
```
5.) Create and migrate Sqlite Databases
```
bundle exec rake db:create && bundle exec rake db:migrate
```
6.) In order to run on the localhost, created .env fill out the values below,
```
SALESLOFT_APPLICATION_ID=changeme
SALESLOFT_APPLICATION_SECRET=changeme
API_PORT=5000
WEBPACK_PORT=5001
```
7.) Add the apikey to .env file to connect to the SalesLoft api. The title of the key should match below,
```
SALESLOFT_API_KEY='yourapikey'
```
8.) Start the development server
```
bundle exec foreman start
```
9.) Navigate to localhost:5000

