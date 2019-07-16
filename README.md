# Price Watching Application for Amazon Products

## Important Notes

This project is for completely personal use. The code in this repo is for illustrative purposes to show how I set up this application.

Also due to the limits of ScraperAPI's Free Plan (only 1000 requests/month), allowing multiple users wouldn't be feasible without
having to limit the app's use (e.g. 5 concurrent users would have to be limited to a max of 5-6 watched items, assuming daily updates).

I have still implemented a user structure into the database, etc. but this was completely for learning purposes.

## TO DO:

- Master collection of all watched products or array of nested product documents in user document? Master list grants ease of iteration
  and ensured uniqueness of each product but both the reference ID and the document must be removed when a product is removed from a user's
  private watchlist. Currently using a "watchers" field to make sure one user removing the product does not remove it if another is still
  watching.

## Implementation

1. Using an Express.js API to handle all calls to the MongoDB database.

2. Node service that utilises the ScraperAPI microservice to scrape given product prices every 12 hours (scheduling method TBD).
   The watched products will be refreshed all at once at a specific PST time (can be optimised for scalability)

3. MongoDB database with a Users collection and stores documents on user info (i.e. authentication and saved products),
   and a Products collection, which is a single document with an array of embedded documents. This array is what will be
   updated systematically by our Node service.

#### To Be Determined:

- Hosting service (Heroku for Scheduling Add-on, vs AWS or Now)
- Best Node scraping modules/method

## Schemas

### Users

```json
{
  "_id": ObjectID,
  "email": {
    "type": String,
    "required": true
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
      "productId": String
    }
  ]
}
```

Each user's document stores the document ID (\_id) of each product currently being watched by that User. The array is then iterated through to collect the
relevant list of products for the user.

### Products

```json
{
  "_id": ObjectId,
  "url": {
    "type": String,
    "required": true,
    "unique": true,
    "match": [
      /^https:\/\/www\.amazon\.ca\/.+\/dp\/\w{10}$/g,
      "is not a valid url"
    ]
  },
  "name": {
    "type": String,
    "required": true
  },
  "currentPrice": {
    "type": Number,
    "required": true
  },
  "priceChange": Number,
  "onSale": Boolean,
  "watchers": Number
}
```

All product documents will be iterated over by the scraper and updated to store not only the current selling price but the recent change in price and if
it is included in any deal going on.

**Important:** Each product document must be unique (can be determined by the url) so as to avoid unnecessary duplicates.

## Routes/Endpoints

#### /api/users/

- **/**

  - _POST_: Create a user

- **/:id**
  - _GET_: Return the JSON of a specific user
  - _PUT_: Update user data\*
  - _DELETE_: Delete a specific user

#### /api/products/

- **/**

  - _GET_: Used to return all currently watched products
  - _POST_: Create a new watched product doc

- **/:id**
  - _GET_: Return a specific product (used to show user's personal product list)
  - _PUT_: Update values for a specific product
  - _DELETE_: Delete a specific product that is being watched\*

\* -> Both must be used when a watched item is removed from a user's list.
