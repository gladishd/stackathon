/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './Navbar'
export { default as UserHome } from './user-home'
export { Login, Signup } from './auth-form'

export { default as Graphs } from './Graphs'
export { default as HowlComp } from './HowlComp'

// so that we can say
// import { Main } from './components';
// instead of
// import { Main } from './components/Main;
export { default as Chat } from './Chat'
