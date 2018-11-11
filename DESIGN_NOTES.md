# Instructions

From the course Project Overview, we create a bookshelf app that fulfills the [Project Rubric](https://review.udacity.com/#!/rubrics/918/view) See also, #2 [...FENDp6/issues/2](https://github.com/rudimusmaximus/FENDp6/issues/2)

# Given Design (from course materials)

# DESIGN_NOTES
This section to document `React` thinking style. Outline from demo listed in `README.md`  

**Task**: Create a React app that lets us TODO: interpret given design

```
<!-- info:
- TODO
 -->
```

TODO: notes

```
<!-- caveats, restrictions, validations:
- TODO
 -->
```
TODO: notes

```
<!-- Key Interaction:
- TODO
 -->
```

  "**About State**: State management is at the heart of React. It allows us to have a single source of truth for our entire application. That means that we don't need to make sure that our data is synched across multiple components; React does it for us. It happens via unidirectional data flow: parent components pass properties to child components as props.

  Remember that state cannot be modified outside of the component in which it is declared. If a child component needs to pass some data back up to the parent (e.g. a form that conveys the new user information to the component that holds that the users piece of state), we'll need to pass callbacks from the component that holds state all the way down to the required component. By calling those callbacks, child components are able to pass data to back up to their parents, which are able to modify their state. Props can go through multiple components to get to the component they ultimately need to reach.

  This practice exercise will help you cement your understanding of where to put state, how to update and access state, when to use stateless functional components, and how to use controlled components.

  We recommend following the [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html when you're building your React applications."  
  
    **~ from react walk through, possibly originally from react docs**

## Design Note Steps
### Step 1. Break down the app into a hierarchy of components. Draw a box around each React component.
"EXAMPLE
- App
  - AddUser
  - UserList
    - User
"

### Step 2. Determine the data in our app.  
"EXAMPLE
- new first name
- new last name
- new username
- userExists (for error message)
- users
- username
- showGamesPlayed
- numGamesPlayed
"  

### Step 3. Figure out the data that should be a part of our state:

1.  Is it passed in from a parent via props? If so, it probably isn’t state.
2.  Does it remain unchanged over time? If so, it probably isn’t state.
3.  Can you compute it based on any other state or props in your component?
    If so, it isn’t state.

#### State:

"EXAMPLE
- new first name, new last name, new username
- users
- userExists
- showGamesPlayed
"  

#### Not state:
"EXAMPLE
- username
- numGamesPlayed
"

### Step 4. Identify where each piece of state lives.

1.  Identify every component that renders something based on that state.
2.  If multiple components need the same piece of state, put that piece of state into those components' parent-most component.

If you can’t find a component where it makes sense to own the state, create
a new component simply for holding the state and add it somewhere in the
hierarchy above the common owner component.  

"EXAMPLE
users:

- UserList (renders users)
- AddUser (to see if it already exists)
- In order for both to access users => lift up state to their parent-most component: App component

new first name, new last name, new username

- AddUser
- We need a single source of truth => form is a controlled component

userExists

- AddUser
- We need a single source of truth => form is a controlled component

showGamesPlayed

- UserList
- User
- => Store it in UserList
"  

### Step 5. Add Inverse Data Flow.

State should be updated inside of the component where that state lives.
If we pass state down from component A to component B and then need to update
the state based on something that happened in component B, we can do so via
callbacks: Component A will not only pass state to Component B, but it will
also pass a callback function that will fire whenever the state should be updated.

Inverse data flow: Need execute something in the parent component, but need to access data from the child component
