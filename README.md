# MeterReadings
 
## Project tech stack
* ASP .Net Core 3.1 with Angular
* SQLite
* Entity Framework
* SCSS
* Bootstrap
* Angular Material Design
## How to run
Execute the following instructions on Visual Studio Code:
`dotnet build`
`dotnet run`

Alternatively, build and execute on Visual Studio.

Open `localhost:5001` on a browser, which should display a simple navigation menu.

## Features

### Customer Accounts
1. Ability to import accounts via CSV
2. Ability to view all accounts

### Meter Readings
1. Ability to import meter readings via CSV
2. Ability to view all meter readings

## TODO
- [ ] Add unit tests
- [ ] Add Search functionality instead of loading all
- [ ] Improve the UI to display Stats
- [ ] Separate data from controller using repositories
- [ ] Create response objects and use in controllers
- [ ] Fix dates to take into account time zone
- [ ] Display validation errors for import
