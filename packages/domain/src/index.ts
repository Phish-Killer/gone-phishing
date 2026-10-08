// Web-only domain logic: input validation schemas and database queries.
// Boilerplate — empty barrel. Example apps fill this with their own
// schemas and query functions, following the web-only convention.// Web-only domain logic: input validation schemas and database queries.
export { listURLs } from "./queries/urls";
export { SignIn } from "./schemas/auth";
export { findOrCreateUser } from "./queries/user";