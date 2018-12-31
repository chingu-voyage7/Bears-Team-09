# API Specification

## JSON Objects returned by API

### Token

```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6ImwyZmxhbWVAZ21haWwuY29tIiwiaWF0IjoxNTQ0MTYzMDg0LCJleHAiOjE1NDQyNDk0ODR9.nhHnAN-80PMRquMH0SqvwXKiJ884F3p-UtOSV4G0XDo"
}
```

### User

```JSON
{
    "id": 42,
    "email": "kenny@gmail.com",
    "first_name": "Kenny",
    "last_name": "McCormick",
    "bio": "Lorem ipsum"
}
```

### Multiple Users

```JSON
{
    "users" : [
        {
            "id": 42,
            "first_name": "Kenny",
            "last_name": "McCormick",
            "bio": "Lorem ipsum"
        }
    ]
}
```

### Place

```JSON
{
    "id": 42,
    "country": "Canada",
    "city": "Toronto"
}
```

### Multiple Places

```JSON
{
    "places": [
        {
            "id": 42,
            "country": "Canada",
            "city": "Toronto"
        },
        {
            "id": 43,
            "country": "United States of America",
            "city": "New York"
        }
    ]
}
```

### Activity

```JSON
{
    "id": 42,
    "name": "Fishing"
}
```

### Multiple Activities

```JSON
{
    "places": [
        {
            "id": 42,
            "name": "Fishing"
        },
        {
            "id": 43,
            "name": "Hiking"
        }
    ]
}
```

### Event

```JSON
{
    "id" : 42,
    "name" : "Event name",
    "description" : "Event description",
    "activity" : "Activity name",
    "country" : "Canada",
    "city" : "Toronto",
    "date_from" : "2018-12-07 22:00:00.0",
    "date_to" : "2018-12-07 23:00:00.0",
    "min_people" : 2,
    "max_people" : 3
}
```

### Multiple Events

```JSON
{
    "events": [
        {
            "id" : 42,
            "name" : "Event name",
            "description" : "Event description",
            "activity" : "Activity name",
            "country" : "Canada",
            "city" : "Toronto",
            "date_from" : "2018-12-07 22:00:00.0",
            "date_to" : "2018-12-07 23:00:00.0",
            "min_people" : 2,
            "max_people" : 3
        }
    ]
}
```


## API endpoints

All `GET` request returns 200 status code in case of success or 400/401/404 in case of failure.

### Register

`POST auth/register`

Example request body:

```JSON
{
    "email": "kenny@mail.com",
    "password": "123456"
}
```

No authentication required.

### Login

`POST auth/login`

Example request body:

```JSON
{
    "email": "kenny@mail.com",
    "password": "123456"
}
```

Required fields: `email`, `password`

No authentication required, returns a [Token](#token)

### Refresh auth token

`GET auth`

JWT authentication required, returns [Token](#token)

### Get active user info

`GET users`

JWT authentication required, returns [User](#User)

### Delete active user

`DELETE users`

JWT authentication required

### Update active user

`PUT users`

Example request body:

```JSON
{
    "email": "kenny@mail.com",
    "first_name": "Kenny",
    "last_name": "McCormick",
    "bio": "Some bio",
    "password": "123456"
}
```

JWT authentication required

All fields are optional

### Get all events attended by active user

`GET users/events`

JWT authentication required, returns [Multiple events](#multiple-events)

### Get all events attended by user identifiend with `id`

`GET users/:id/events`

JWT authentication required, returns [Multiple events](#multiple-events)

### Get all activities

`GET activities`

JWT authentication required, returns [Multiple activities](#multiple-activities)

### Create an activity

`POST activities`

Example request body:

```JSON
{
  "name": "Fishing"
}
```

JWT authentication required

Required fields: `name`

### Get the activity

`GET activities/:id`

JWT authentication required, returns [Activity](#activity)

### Delete the activity

`DELETE activities/:id`

JWT authentication required

### Update the activity

`PUT activities/:id`

Example request body:

```JSON
{
  "name": "Fishing"
}
```

JWT authentication required

All fields are optional

### Get all places

`GET places`

JWT authentication required, returns [Multiple places](#multiple-places)

### Create a place

`POST places`

Example request body:

```JSON
{
  "country": "Canada",
  "city": "Toronto"
}
```

JWT authentication required

Required fields: `country`, `city`

### Get the place

`GET places/:id`

JWT authentication required, returns [Place](#place)

### Delete the place

`DELETE places/:id`

JWT authentication required

### Update the place

`PUT places/:id`

Example request body:

```JSON
{
  "country": "Canada",
  "city": "Toronto"
}
```

JWT authentication required

All fields are optional

### Get all the events

`GET events`

JWT authentication required, returns [Multiple events](#multiple-events)

### Create an event

`POST events`

Example request body:

```JSON
{
    "name" : "Event name",
    "description" : "Event description",
    "activity_id" : 2,
    "place_id": 3,
    "date_from" : "2018-12-07 22:00:00.0",
    "date_to" : "2018-12-07 23:00:00.0",
    "min_people" : 2,
    "max_people" : 3
}
```

JWT authentication required

Required fields: `name`, `activity_id`, `max_people`

Optional fields: `description`, `place_id`, `date_from`, `date_to`, `min_people`

### Get the event

`GET events/:id`

JWT authentication required, returns [Event](#event)

### Delete the event

`DELETE events/:id`

JWT authentication required

### Update the event

`PUT events/:id`

Example request body:

```JSON
{
    "name" : "Event name",
    "description" : "Event description",
    "activity_id" : 2,
    "place_id": 3,
    "date_from" : "2018-12-07 22:00:00.0",
    "date_to" : "2018-12-07 23:00:00.0",
    "min_people" : 2,
    "max_people" : 3
}
```

JWT authentication required

All fields are optional

### Add active user to event attendees

`POST events/:id/attend`

JWT authentication required

### Delete active user from the event attendees

`DELETE events/:id/attend`

JWT authentication required