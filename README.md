 #  NAVEDEX API.

## How to use.

### Installation
---
- Clone the project by using: 

```bash
git clone https://github.com/gustavocioccari/navedex-api.git
```

- Navigate to the project folder and run the following commando to install dependencies:

```bash
npm install
```
---
### Setup
---
- You'll need to setup a postgres database.

- Create a .env file in the project folder (or just rename .envExample) and add your database credentials to it.
    
|  Exemplo         |
|  :---:           |
| USER=postgres    |
| HOST=localhost   |
| DATABASE=navedex |
| PASSWORD=12345   |
| PORT=3333        |

- In order to create the project tables run:
  
```bash
npx knex migrate:latest
```
---
### Running the API
---
- Now to start the application run the command:

```bash
npm start
```
---
### Insomnia
---
- You can test the API endpoints by using insomnia. To do so you can import the insomnia file by clicking the button below.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Navedex%20api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fgustavocioccari%2Fnavedex-api%2Fmaster%2FInsomnia_2021-03-08.json)

- When you authenticate you can copy the JWT Token that returned from the request to the "token" environment variable in insomnia by copying it then using CTRL+E (open the base environment) and pasting it to replace the old token.
---
## Difficulties
---
- I tried to implement tests using jest but I'm not very experienced with it and I'm still learning how to properly use and configure it so I couldn't implement that on time until dealine.

- I tried to handle errors to each situation but I wish I could have done it better, in a more specific way to each posible mistake made by who would interact with the API. I think that implementing tests would help dealing with it.

- Besides that I had some difficulties with the relationships between navers and projects but I think I could implement it well.
---
## Conclusion
---
- I really enjoyed doing this project. I could learn and apply some new concepts I hadn't worked with yet and also remember some that I haven't applied recently.

- If you have any troubles on running this project please contact me.
