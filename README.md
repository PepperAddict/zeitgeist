## Inspiration
I great enjoy retrospective and the conversations that happen during this time. Unfortunately from what I noticed, not every company does this and I would love to encourage using a start, stop, continue tool that's free and extremely simple to use.

## What it does
This app is a real time messaging service that updates within its category and other users will see the changes in real time. 

There are categories such as: 

* Start: The user will mention what they recommend the team should start doing. 
* Stop: Something that the user disagrees with within the team. 
* Continue: A spotlight to acknowledge the positive. 

If the user sees a message that they agree with, the user can "plus one" to acknowledge they agree. 

Once it's review time, the user can gather the message that they want to create an action item by dragging that message to the action item section. 

An extra copy feature for that message will appear making it easier to send it to an outside service. 

## How we built it

The frontend was built with React and Apollo.
The backend was built with ExpressJS/Nodejs and GraphQL

There was a lot of fun features that we enjoyed working with, such as microsoft's speech to text feature that works amazingly well. In order to have that work, we used navigator's microphone capture. 

For any data that could be updated on any viewer was made possible with GraphQL's subscription service. 


## What's next for Zeitgeist
I really wanted to implement api to create tickets straight from our app to Jira, however, would require the user to set up their jira domain, issueType, etc. It was not ideal. 
