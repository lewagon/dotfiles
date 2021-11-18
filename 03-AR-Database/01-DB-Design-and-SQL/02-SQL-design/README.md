## Background & Objectives

The goal of this second challenge is to become familiar with database design, a **crucial** skill to make your backend maintainable, flexible and efficient.

## Specs

### Survey database design

There are many ways to build a survey database, but let's start by building a basic system with users, questions, responses and surveys.

Here are the requirements of our system:
- The application manages several `users`
- A user can create many `surveys`, but a survey is created by only one user
- A survey has several `questions`.
- A question has several possible `answers`.
- When a user answers a question, they can only choose one answer. These are stored as `user_answers`.

### Design the schema

Design a database schema for a survey app that meets the requirements. For this, you must use the [SQL Designer](http://db.lewagon.com). To check your solution, click on "Save / Load", then "Save XML", copy/paste the generated XML code in `lib/survey.xml`. You can then `rake` to check your solution.

## Key learning points

- Do you know what a schema is?
- What's the relation between tables?
- Could you draw the database scheme behind Facebook? Airbnb? Take a bit of paper and have a go!
