# Instructions

From the course Project Overview, we create a bookshelf app that fulfills the [Project Rubric](https://review.udacity.com/#!/rubrics/918/view) See also, #2 [...FENDp6/issues/2](https://github.com/rudimusmaximus/FENDp6/issues/2)

# Given Design (from course materials)
Direct from course so we can demonstrate interpretation in next section "DESIGN_NOTES".

## App Functionality
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:
 - Currently Reading
 - Want to Read
 - Read

 <img width="665" alt="screen shot 2018-11-10 at 10 54 00 pm" src="https://user-images.githubusercontent.com/21182598/48309260-932f9380-e53b-11e8-9afa-b0b691d1dcc0.png">

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

<img width="273" alt="screen shot 2018-11-10 at 10 52 37 pm" src="https://user-images.githubusercontent.com/21182598/48309251-67aca900-e53b-11e8-81b9-748a1e367d77.png">

The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. To keep the interface consistent, you may consider re-using some of the code you used to display the books on the main page.

<img width="664" alt="screen shot 2018-11-10 at 10 58 08 pm" src="https://user-images.githubusercontent.com/21182598/48309319-ff5ec700-e53c-11e8-8321-371537633503.png">

When a book is on a bookshelf, it should have the same state on both the main application page and the search page.

The search page also has a link to / (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.

# DESIGN_NOTES
This section to document `React` thinking style. Outline from demo listed in `README.md`  

**Task**: Create a React app that lets us manage a three shelf list of books.

```
<!-- info:
- 'Currently Reading' list of books
- 'Want to Read' list of books
- 'Read' list of books
- Book images, book title, and author text
- Approved search terms list that works with a given search api
 -->
```

TODO: notes

```
<!-- caveats, restrictions, validations:
- shelves reflect search activity immediately
 -->
```
TODO: notes

```
<!-- Key Interaction:
- you can go back to main from search page
- you can go to a search page from the main page
- Each book has a control that lets you select the shelf for that book
- you can use control anywhere you see a book and the default value shown by the control when used should always be the current shelf the book is in
 -->
```

  "**About State**: State management is at the heart of React. It allows us to have a single source of truth for our entire application. That means that we don't need to make sure that our data is synched across multiple components; React does it for us. It happens via unidirectional data flow: parent components pass properties to child components as props.

  Remember that state cannot be modified outside of the component in which it is declared. If a child component needs to pass some data back up to the parent (e.g. a form that conveys the new user information to the component that holds that the users piece of state), we'll need to pass callbacks from the component that holds state all the way down to the required component. By calling those callbacks, child components are able to pass data to back up to their parents, which are able to modify their state. Props can go through multiple components to get to the component they ultimately need to reach.

  This practice exercise will help you cement your understanding of where to put state, how to update and access state, when to use stateless functional components, and how to use controlled components.

  We recommend following the [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html when you're building your React applications."  
  
    **~ from react walk through, possibly originally from react docs**

## Design Note Steps
### Step 1. Break down the app into a hierarchy of components. Draw a box around each React component.

- App
  - AddBook (find book)
  - MyBookList
    - Book
      - BookShelfAssigner

### Step 2. Determine the data in our app.  

- book title
- book author
- current shelf name
- shelf 1 list
- shelf 2 list
- shelf 3 list
- future shelf (move to shelf)

### Step 3. Figure out the data that should be a part of our state:

1.  Is it passed in from a parent via props? If so, it probably isn’t state.
2.  Does it remain unchanged over time? If so, it probably isn’t state.
3.  Can you compute it based on any other state or props in your component?
    If so, it isn’t state.

#### State:

- book title
- book author
- current shelf name
- current shelf owner (implied, never changes, do we need?)

#### Not state:

- shelf 1 list
- shelf 2 list
- shelf 3 list
- future shelf (move to shelf)

### Step 4. Identify where each piece of state lives.

1.  Identify every component that renders something based on that state.
2.  If multiple components need the same piece of state, put that piece of state into those components' parent-most component.

If you can’t find a component where it makes sense to own the state, create
a new component simply for holding the state and add it somewhere in the
hierarchy above the common owner component.  

**Candidate Components**
c - App (a list of books is needed by both the MyBookList and the AddBook components, so lifting state to higher parent which is App OR new BookUniverse?)
c    - Book (a single book)
        - book title
        - book author
        - current shelf name
c      - BookShelfAssigner (changes shelf)

c  - AddBook (find book among All Books)
c    - BookExists (list the hits)
c  - MyBookList (main home page to show My Books)

### Step 5. Add Inverse Data Flow.

State should be updated inside of the component where that state lives.
If we pass state down from component A to component B and then need to update
the state based on something that happened in component B, we can do so via
callbacks: Component A will not only pass state to Component B, but it will
also pass a callback function that will fire whenever the state should be updated.

Inverse data flow: Need execute something in the parent component, but need to access data from the child component
