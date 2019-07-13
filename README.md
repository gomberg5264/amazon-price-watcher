# Price Watching Application for Amazon Products

## Implementation

1. Using an Express.js API to handle all calls to the MongoDB database.

2. Node service that utilises the ScraperAPI microservice to scrape given product prices every 12 hours (scheduling method TBD).
   The watched products will be refreshed all at once at a specific PST time (can be optimised for scalability)

3. MongoDB database with a Users collection and stores documents on user info (i.e. authentication and saved products),
   and a Products collection, which is a single document with an array of embedded documents. This array is what will be
   updated systematically by our Node service

### To Be Determined:

- Hosting service (Heroku for Scheduling Add-on, vs AWS or Now)
- Best Node scraping modules/method
