# Validate HackerNews articles sort order

## Assignment

For this assignment I have created a script to validate the sort order of the first N articles at [Hacker News](https://news.ycombinator.com/) using JavaScript and the [Playwright](https://playwright.dev/) framework.

The script will visit [Hacker News Newest Page](https://news.ycombinator.com/newest) and continue collecting article IDs and timestamps while using the 'More' button until the specified number of articles to validate has been reached.

Next, the collection of articles will be iterated over and the creation timestamp of each article will be compared to ensure sort order is from newest to oldest.

If any articles are out of order, a log will be generated in the console indicating which article IDs and timestamps were out of order.

## Running the Script

Install: ```npm install``` & ```npx playwright install```

Run tests: ```npx playwright tests```

## Reporting

Report will be generated at ```/playwright-report/index.html```




