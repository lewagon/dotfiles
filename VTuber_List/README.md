# VTuber_List

This is a Rails-based web application that allows you to make lists of VTubers, whether you want to make lists of your oshis, or those that you happened to find by chance and want to check out later.

_DROP SCREENSHOT HERE_
<br>
App home: https://WHATEVER.herokuapp.com


## Getting Started
### Setup

Install gems
```
bundle install
```

### ENV Variables
Create `.env` file
```
touch .env
```
Inside `.env`, set these variables. For any APIs, see group Slack channel.
```
CLOUDINARY_URL=your_own_cloudinary_url_key
```

### DB Setup
```
rails db:create
rails db:migrate
rails db:seed
```

### Run a server
```
rails s
```

## Built With
- [Rails 7](https://guides.rubyonrails.org/) - Backend / Front-end
- [Stimulus JS](https://stimulus.hotwired.dev/) - Front-end JS
- [Heroku](https://heroku.com/) - Deployment
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Bootstrap](https://getbootstrap.com/) — Styling
- [Figma](https://www.figma.com) — Prototyping

## Acknowledgements

## Team Members
- [Sunjun Hwang](https://www.linkedin.com/in/Junichoco/)

## Contributing
## License
