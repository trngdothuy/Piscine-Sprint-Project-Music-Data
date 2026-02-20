# Piscine Sprint Project: Music Data
#### By Trang Do (@trngdothuy) 

## Link to the deployed website:

## Introduction
### User Story

I'm a music lover who enjoys spending hours listening to music. I'm curious about my listening history and have a list of questions about it. I want to know the answers and my friends also love to do that. 

So I want to have this website to display the answers to the questions about our listening behaviors (that are listed below). We should be able to choose whose information we want to see from the selector bars. 

### Questions to answer
1. What was the user's most often listened to song according to the data?
2. What was the user's most often listened to artist according to the data?
3. What was the user's most often listened to song on Friday nights (between 5pm and 4am)?
4. What are the answers to the above questions if using listening time rather than number of listens?
5. What song did the user listen to the most times in a row (i.e. without any other song being listened to in between)? How many times was it listened to?
6. Are there any songs that, on each day the user listened to music, they listened to every day? If the answer is yes, you should show which one(s). If the answer is no, you should not show anything about this question.
7. What were the user's top three genres to listen to by number of listens?

## Set up
To install `jest`:
```
npm install jest
```
To install `http-server`:
```
npm install http-server
```

## Rubric
- [ ] The website must contain a drop-down which lists four users.
- [ ] Selecting a user must display answers relevant to that user (see table below).
- [ ] The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:
    - User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. "This user didn't listen to any songs.").
    - If a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.
    - If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like "Top 3 genres", but may say "Top genres" or "Top 2 genres" or similar.
- [ ] Unit tests must be written for at least one non-trivial function.
- [ ] The website must score 100 for accessibility in Lighthouse

#### Bonus points (which don't mean anything):

- [ ] Re-using code between the "most often" questions (i.e. questions 1, 2, 3, 4).
- [ ] End-to-end tests.
