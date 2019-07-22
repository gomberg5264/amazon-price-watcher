# Price Watching Application for Amazon Products

## Important Notes

This project is for completely personal use. The code in this repo is for illustrative purposes to show how I set up this application.

Also due to the limits of ScraperAPI's Free Plan (only 1000 requests/month), allowing multiple users wouldn't be feasible without
having to limit the app's use (e.g. 5 concurrent users would have to be limited to a max of 5-6 watched items, assuming daily updates).

I have still implemented a user structure into the database, etc. but this was completely for learning purposes.

## TO DO:

- Master collection of all watched products or array of nested product documents in user document? Master list grants ease of iteration
  and ensured uniqueness of each product but both the reference ID and the document must be removed when a product is removed from a user's
  private watchlist. **Currently allowing duplicate products in the master product list**

- Add authorisation/authentication for User model

- Single endpoint that manages user product deletion from private and master list

## Implementation

1. Using an Express.js API to handle all calls to the MongoDB database.

2. Node service that utilises the ScraperAPI microservice to scrape given product prices every 24 hours (see #4)

3. MongoDB database with a Users collection and stores documents on user info (i.e. authentication and saved products),
   and a Products collection, which is a single document with an array of embedded documents. This array is what will be
   updated systematically by our Node service.

4. Heroku Scheduler is utilised on a Heroku deployment to make sure all products are scraped daily (12:00am UTC). The "scraper" dir holds all scripts currently on the Heroku deployment

#### To Be Determined:

- Move product.service from promise-based to await/async (personal choice)
- Create script that will be run by Heroku Scheduler (POST request to /api/scrape)

## Schemas

### Users

```json
{
  "email": {
    "type": String,
    "lowercase": true,
    "unique": true,
    "required": [true, "can't be blank"],
    "match": [/\S+@\S+\.\S+/, "is invalid"]
  },
  "hash": {
    "type": String,
    "required": true
  },
  "enableAlert": {
    "type": Boolean,
    "required": true
  },
  "savedProducts": [
    {
      "type": mongoose.Schema.Types.ObjectId,
      "ref": "Product",
      "default": []
    }
  ]
}
```

Each user's document stores the document ID (\_id) of each product currently being watched by that User. The array is then iterated through to collect the
relevant list of products for the user.

### Products

```json
{
  "url": {
    "type": String,
    "required": true,
    "match": [/^https:\/\/www\.amazon\.ca\/.+\/\w{10}$/g, "is not a valid url"]
  },
  "name": {
    "type": String
  },
  "currentPrice": {
    "type": Number,
    "default": 0
  },
  "priceChange": {
    "type": Number
  },
  "onSale": {
    "type": Boolean
  }
}
```

All product documents will be iterated over by the scraper and updated to store not only the current selling price but the recent change in price and if
it is included in any deal going on.

**Important:** Currently allowing duplicate product documents (MUST DEPRECATE)

## Routes/Endpoints

#### /api/users/

- _/authenticate_

  - **POST**: Authenticate a login request

- _/register_

  - **POST**: Create a user document

- _/:id_

  - **GET**: Return the JSON of a specific user
  - **PUT**: Update user data
  - **DELETE**: Delete a specific user

- _/:id/products_

  - **GET**: Return list of all saved products (populated from IDs)
  - **POST**: Save ID of new product to watch

- _/:id/products/:pid_
  - **DELETE**: Remove the product ID from list of saved products\*

#### /api/products/

- _/_

  - **GET**: Used to return all currently watched products
  - **POST**: Create a new watched product doc

- _/:id_
  - **GET**: Return a specific product (used to show user's personal product list)
  - **PUT**: Update values for a specific product
  - **DELETE**: Delete a specific product that is being watched\*

\* -> Both must be used when a watched item is removed from a user's list.

#### /api/scrape

- _/_

  - **POST**: Pinged by scheduled task to updated all watched product documents

- _/:id_

  - **POST**: Refresh a specific product document
