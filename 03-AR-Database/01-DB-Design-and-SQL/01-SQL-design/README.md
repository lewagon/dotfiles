## Background & Objectives
The goal of this first challenge is to become familiar with database design, THE crucial skill to make your backend maintainable, flexible and efficient.

## Specs

#### Survey database design

There are many ways to build a survey database, but let's start by building a basic system with users, questions, responses and votes.

Here are the requirements of our system:

1. A user can create many surveys, but a survey is created by only one user
2. A survey has a question, e.g., "What is your favorite meal?"
3. A survey has many responses, e.g., "Chicken Tandoori","Boeuf Carotte","Coq au vin","Fish and Chips",etc.
4. A user can vote in any survey, but only once, and they can only select one response per survey

#### Design the schema

Design a database schema for a survey app that meets the requirements. For that, your are going to use [SQL Designer](http://db.lewagon.org). To submit your solution, copy/paste the XML code of your schema in `survey.xml` and push it on Github.

## Learning Badges

- Do you understand what's a database scheme?
- What's a relation between tables?
- Which kinds of relation do you know? (one-to-many, many-to-many, etc..)
- Can you guess the database scheme behind facebook? airbnb? any web service you pick? Try to draw it on a sheet of paper.
