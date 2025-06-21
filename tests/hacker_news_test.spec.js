import { test, expect } from '@playwright/test';

test('Articles sorted newest to oldest', async ({ page }) => {
  // This test checks that the articles on Hacker News are sorted from newest to oldest
  // by gathering a specified number of articles and comparing their timestamps.

  const numArticlesToCheck = 100;
  const moreButton = page.getByRole('link', { name: 'More', exact: true });
  let articles = [];

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  console.log("--> Gathering articles...");

  /*
  Gather article IDs and timestamps until we have enough
  or until the "More" button is no longer available,
  which will timeout and fail the test.
  */
  while (articles.length < numArticlesToCheck) {
    const articleRows = await page.locator('.athing.submission').all();
    for (const row of articleRows) {
      const id = await row.getAttribute('id');
      let timestamp = await row.locator('xpath=following-sibling::tr[1]//span[@class="age"]').getAttribute('title');
      timestamp = timestamp.split(' ')[0] + '.000Z'; // Convert to UTC
      articles.push({ id, timestamp });
      if (articles.length >= numArticlesToCheck) break;
    }
    await moreButton.click();
  }
  if (articles.length < numArticlesToCheck) {
    throw new Error(`Only gathered ${articles.length} articles, expected at least ${numArticlesToCheck}`);
  }

  console.log(`--> ${articles.length} articles gathered`);
  console.log(`--> Comparing ${articles.length} timestamps...`);

  // check sort order of articles is newest to oldest
  let sorted = true;
  for (let i = 1; i < articles.length; i++) {
    const timestamp_1 = new Date(articles[i - 1].timestamp);
    const timestamp_2 = new Date(articles[i].timestamp);
    if (timestamp_1 < timestamp_2) {
      sorted = false;
      console.log(`--> Article ID: ${articles[i-1].id} at ${timestamp_1} is older than: ${articles[i].id} at ${timestamp_2}`);
      break;
    }
  }
  if (!sorted) throw new Error("Articles are not sorted from newest to oldest.");
  
  // articles are sorted, end the test
  await page.close();
  console.log("--> Test finished. All articles are correctly sorted from newest to oldest.");
});
