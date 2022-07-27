# Welcome! What does this app do?

This app allows you to enter a GitHub user's username to get information about that user. Upon clicking enter, the information about searched users will appear in the table below the search bar. 

# React, TypeScript, Firestore

This project was created with React using the TypeScript template. The backend uses Googles Firebase Firestore as a database.

# To start

Use npm i to install node modules. 
Use npm start to start up the app.

## App.tsx

The App.tsx file, as the topmost level, runs two components: the search field (<InputFiled> and <UserList>). It has two pieces of state that are passed as props to each component. Both components require the **username** that the user enters in the search bar and the **updatePage** state that is used to indicate when (after the initial call) a call should be made to retrieve the newest user information. 

### App.tsx Considerations

I have previously useContext - a React hook - an excellent alternative to passing props and/ or Redux. However, a quick cost-benefit analysis made me realize it wasn't a good fit for this project. I only had two pieces of state that needed to be shared across components, and nothing else. Passing these props was not as cumbersome and time consuming as teaching myself how to use useContext with TypeScript. I gave myself 30 minutes to try to figure it out, just for good measure, then I moved on (since I had already figured out passing props with TypeScript).

## Components
This app uses only two components: <InputField> <UserList>.

### InputField Component
<InputField> displays a search bar and has the logic for capturing and storing the searched username.

All the state is at the top of this component. At first, I thought I would have each piece of user information stored as a separate piece of state. While it's less elegant, it is often clearer to me to deal with smaller pieces of information. However, combining this state into one object made sense for two reasons: 1. I needed to send the user information to the database only after state was updated. I could do this by including an updated key in the data state. 2. It really was more elegant and still just as understandable (if not moreso) to make it all one object. 

There is an API call to github to gather the user information and store it in state. This function also sets the success or error message. 

A useEffect is triggered when the data are updated (i.e., have *finished* being updated). Inside this useEffect, data are sent to the database and the UpdatePage state (top level) is set to true, so the <UserList> component can use that information to add the new line of user information to the table.

The keyDownHandler function, just before the return, makes the API call given an 'enter key' click. (See Components Considerations below.)

### UserList Component
<UserList> displays a table of user information and has the logic for getting users from the database.

Again, state is stored at the top. After that I have one variable that defines which collection I want from the database. Finally, there's a useEffect that gets all the documents from the database and sets them in state. This useEffect runs when updatePage state changes, so it runs when the app opens and when a new user is added.

### Components Considerations

At some point, I had the table updating without that extra piece of shared state - updatePage. If I were to redo this project, I'd try to figure out when/ where I lost that ability. If I don't need the updatePage state, I'd like to be able to take it out. Less is more. 

One of the biggest unexpected challenges of this project was one little phrase: "upon hitting the 'enter' button". I had made buttons do things, I had never made the enter key do things. It took some research and a few tries to get to the keyDownHandler function. Well worth the effort and I would really like to see how other professionals solve this (possibly more elequently).

As far as architecture goes, I thought about if and how to separate out some of the logic, especially the calls to the GitHub API and to the database. Because these things only needed to be done in once, I kept them with their related display components. If this project were any more complex, I'd likely have moved any functions that needed to be used more than once to a context file and used useContext hook. 

## Firestore
At the top level there's a firebase.ts file. It configures, initializes, and exports the database for use elsewhere in the app. 

## Firestore Considerations
Here's my key learning point from this project: build from the ground up rather than trying to do everything at once. I tried to find tutorials using Firestore, Typescript, and React. This was a waste of time. It ultimately made *much* more sense to take this in small bites, and put it all together on my own. 

My best analogy is the "whole reading" versus "phonics based" approaches to reading debate that happened in the 1980's. Whole reading worked for some kids (but not many): We'll expose you to the whole big picture, and you can make sense of it. While the big picture is important, if we give kids the building blocks for decoding (i.e., phonics), they'll then be able to put those pieces together to read words. I really should've just started this project with phonics. Once I took a few minutes to understand firestore (using JS, which ultimately was no different, grr), then took a few minutes to dive into TypeScript, I was able to put them all together in React. 

## CSS
It's super simple. There's one CSS file (styles.css) within the components folder that both components use. There's the default App.css file on the top level that keeps the the whole app centered, and not much else.

### CSS Considerations
If this were any more complex, I likely would have created a CSS file for each component (or set of components) and/ or used CSS modules so basic styles could be easily shared and changed. 

