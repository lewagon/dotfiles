## Background & Objectives

The goal of this first challenge is to become familiar with database design, a **crucial** skill to make your backend maintainable, flexible and efficient. To create our databases we will be using the [SQL Designer](http://db.lewagon.com), a tool that we will use several times throughout the bootcamp.

## Specs

### Designing our first table

Let's start by creating a table to store users. The table should have these columns:
- First name
- Last name
- Email

Use the [SQL Designer](http://db.lewagon.com) to draw the `users` table with the columns specified above. To check your solution, click on "Save / Load", then "Save XML", copy/paste the generated XML code in `lib/users.xml`. You can then `rake` to check your solution.

NOTE: Remember, every table needs an `id` column!


### Survey database design

Next up, let's continue from our `users` table to building a survey database. There are many ways to build a survey database, but let's start by building a basic system with users, questions, responses and surveys.

Here are the requirements of our system:
- The application manages several `users` (which we already have)
- A user can create many `surveys`, but a survey is created by only one user
- A survey has several `questions`.
- A question has several possible `answers`.
- When a user answers a question, they can only choose one answer. These are stored as `user_answers`.

### Design the schema

Let's again use the [SQL Designer](http://db.lewagon.com) to design a database schema for a survey app that meets the requirements above. To check your solution, click on "Save / Load", then "Save XML", copy/paste the generated XML code in `lib/survey.xml`. You can then `rake` to check your solution.

## Key learning points

- Do you know what a schema is?
- What's the relation between tables?
- Could you draw the database scheme behind Facebook? Airbnb? Take a bit of paper and have a go!

