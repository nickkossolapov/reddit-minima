# reddit-minima

### Background

This is a super simple reddit client I created to try out test-driven development (TDD) with a front end framework. As per Uncle Bob, there are 3 tentants to TDD:

1. You are not allowed to write any production code unless it is to make a failing unit test pass.
1. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
1. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

To this end, every line in the app was written only after writing a failing test, Even with a lot of the 'plumbing', such as connecting components to the state, was written this way. And so, the app has 100% coverage on all written code. 

Furthermore, with the exception of a wrong keyboard event code and CORS, the entire app was written without running it once, and was otherwise completely functional after fixing these minor issues. 

### Built with: 

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)
* [Enzyme](https://airbnb.io/enzyme/)
