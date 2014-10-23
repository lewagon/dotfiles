## Background & Objectives

The goal of this first challenge is to become familiar with database design,
*the* crucial skill to make your backend maintainable, flexible and efficient.

## Specs

#### Survey database design

There are many ways to build a survey database, but let's start by building a basic
system with users, questions, responses and votes.

Here are the requirements of our system:

1. The application manages several `users`
1. A user can create many `surveys`, but a survey is created by only one user
1. A survey has several `questions`.
1. A question has several possible `answers`.
1. When a user answers a survey, he has to chose, for each question, one and only one answer. Those are stored as `user_answers`.

#### Design the schema

Design a database schema for a survey app that meets the requirements.
For that, your are going to use [SQL Designer](http://db.lewagon.org).
To check your solution, click on "Save / Load", then "Save XML", copy/paste the generated XML code
in `lib/survey.xml`. You can `rake` then to check your solution.

## Learning Badges

- Do you understand what's a database scheme?
- What's the relation between tables?
- Can you guess the database scheme behind facebook? airbnb? any web service you pick? Try to draw it on a sheet of paper.
