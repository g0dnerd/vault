# To Dos

## Back end

### Data structures

- **Refactor**: Reduce `Entity` classes to the minimum required amount, e.g. remove nullable fields
- **Refactor**: Streamline nullable fields in `DTO` classes (e.g. `Foo: number | null` instead of `Foo?: number`)

### Queries

- **Refactor**: Streamline selected and included fields in queries within a model's service: if I want to include `player1.enrollment.user.username` in every enrollment I return, I don't want to have to specify it every time
- **Question**: Should I return nested objects or is it better practice to return their ID and query them again when needed?

### Authentication

- **Check-Up**: Take another look at `PrismaSessionStore` and possible alternatives, at auth token expiry and at proper signing methods and secrets

### `DraftScorecard`s & `Scorecard`s

- **Refactor**: Right now, I have no way of storing standings for a specific round, which I want to have. Probably just FK scorecards to rounds?

### Error types

- **Refactor**: Define consistent error types that can be caught by the front end

## Front end

- **Comment/Docs**: Streamline component names and directory structure

### NGRX

- **Refactor**: Change the reducers for `tournament`, `draft` and `enrollment` to use NGRX `EntityAdapter` instead
- **Refactor**: Streamline error handling - right now, we have `Failure` actions that don't really get used. Also, there is no consistent structure to back end error codes that I can use to handle them in the front end.

### `TournamentDashboard`

- **Feature**: Add a 'drop' button
- **Feature**: Add a standings table (optionally with a dropdown to select the round to display)
- **Feature**: Add a seatings component that clearly displays seats at a physical table
- **Feature**: Add pool upload possibility
  - This needs to be re-worked completely from vault 0.1, we had too many pages and a confusing user flow
  - How can we save some space on and implement guards again spam for image uploads?
  - How do we want to design image names and directory structure?

### `MatchPanel`

- **Refactor**: Change `confirmResult` to use `WebSocketService` directly instead of an NGRX store dispatch

### `AdminTournamentDashboard`

- Add more customization options to the tournament creation dialogue:
  - Do you want pool upload? -> Do you want it to block pairings display?
  - ...
- **Feature**: Add a button to finish an event round
- **Feature**: Add a button to drop a player

### AdminDraftDashboard

- **Feature**: Add buttons for seating a draft and for pairing and finishing a round.
