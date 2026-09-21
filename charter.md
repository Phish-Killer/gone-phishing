# Team Charter

*C12 Fall 2026 · Week 3's homework · written as a team after kickoff
(section 4 while the migration review is fresh) · merged into your team
repo by the Week-4 session · revisit at midterm. Worked example: [charter-example.md](charter-example.md) · how-to:
[charter-guide.md](charter-guide.md).*

## 1 · Team & Project

**Team name:** Phisher Men 

**Project (adopted pitch):** Gone Phishing

**Section:** Fri 3:00

**Members:**

| Name              | GitHub            | Email                     |
|-------------------|-------------------|---------------------------|
| Arunavo Chowdhury | iamarunavo        | iamarunavo@gmail.com      |
| Brian Zhang       | Brian-zhg         | brianz12705@gmail.com     |
| Hector Garcia     | hgarciasoftware   | hgarciasoftware@gmail.com |
| Zhiling Chen      | zhilingchen-elden | zhilingchen346@gmail.com  |

### Roles & responsibilities

Roles rotate weekly so nobody becomes "the one who always…". The stand-up lead runs Friday's 15 minutes and posts the notes. The review captain is first responder on every PR opened that week (others can still review — the captain just guarantees nobody waits). The demo owner keeps main deployable and runs the team's status share when it's our turn. Rotation is in the team channel's pinned message; whoever has it, has it — no swapping without a message.

Standing ownership (from the jigsaw): each member is the first stop for questions in their aspect above. First stop, not sole owner — anyone can change anything, but you ask the expert before you rewrite their layer.

Everyone, every week: one homework PR merged, one review given, stand-up attended or an async update posted before it starts.

## 2 · The Product


A phishing analysis detector where a user submits a url for an email and the detector returns a score for the threat level of the particular email

**The problem:** 191,561 people reported falling for phishing scams in 2025

**Who it's for:** It's for people who want a second opinion on suspicious emails/ links

**Three core features (the MVP):**

1. URL scanner
2. Threat breakdown 
3. Scoring

**What ships by Week 13 (demo day):** User opens the URL and they have the option to submit an email or any kind of links and the site should assess how trust worthy the link/ email is as well as being able to view all prior links the user has submitted. *(be concrete — what
will a stranger see at your demo URL?)*

**Out of scope / v2 ideas (Week-9 pitch fodder):** Making a chrome extension for emails and websites.

## 3 · Working Agreement

**Where we talk:** Discord/ Slack 

**Response window:** 10 hours 

**When we meet (outside class):** Flexible

**Availability notes:** Schedules were sent on discord

**How we decide when we disagree:** Vote, if equal, rock paper scissors 

**Definition of done:** Merged into main through the gate, CI green, reviewed by someone who pulled and ran it, and it works at the preview URL — not "works on my machine."

### Rituals

| Ritual                 | When                                   | Shape                                                                                                                                           |
|------------------------|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Stand-up               | Friday 5:30 pm, 15 min                 | Each person: merged / in review / blocked. Blockers become a named owner before we hang up.                                                     |
| Team review (in class) | Every session, ~15 min of project time | One member's PR on the screen; the four moves (pull it, run it, read it, ask one real question). Comments filed as real review comments.        |
| Async check-in         | Flexible                               | One line each: what's in flight, anything that'll slip. Replaces a meeting, not a conversation.                                                 |
| Retro                  | Midterm (wk 7) + before demo day       | 20 minutes: keep / stop / start. The charter gets edited on the spot — that's the output.                                                       |
| Planning               | Sunday night, async, 10 min            | Next week's PRs claimed in the channel by name, one issue each. If you can't name your PR on Sunday, that's the first thing to say at stand-up. |

**How we track work:** GitHub issues — one per PR, assigned to one person, closed by the merge

## 4 · Code & Review Norms

*Complete this section together in Week 3, at code kickoff.*

**Branch & PR flow:** main is protected. Branch from main as yourname/short-thing, open a PR early (draft is fine), request the review captain plus one. Squash-merge; the PR title is the commit message, so write it like one.

**What blocks approval:** the reviewer couldn't run it; a query that isn't scoped by the current user; a migration that edits an earlier migration instead of adding a new one; AI-generated code the author can't explain when asked. Style never blocks — leave a nit: and approve.

**Review response time:** first response within 48 hours on weekdays. If you can't review in time, say so in the PR so the captain reroutes it — silence is the only unacceptable answer.

**Comment conventions:**nit: (take it or leave it) · q: (a real question — answer before merge) · blocker: (must change) · praise: (say what's good; it's how we learn what to repeat). One blocker: per real problem, not a wall of them.*

## 5 · AI Working Norms

**Course policy (not optional):** no AI-generated code gets merged unread.
The PR author owns every line they open, wherever it came from. AI
explanations get verified by running the code.

**How we use AI as a team:** Must specify in comments what was AI generated

**What we never delegate to AI:** the schema and migrations (hand-typed, per kickoff), anything touching user scoping, and the review itself — a reviewer reads the diff, not a summary of it.

**What we build by hand first**: each layer's first instance. The first endpoint, the first component, the first test in a file are typed; AI accelerates the second one.

## 6 · When Things Go Wrong

Stuck protocol (course default): 15 minutes stuck → post in the team
thread → still stuck at stand-up → TA → office hours.

**If someone can't deliver on time:** Be transparent and responsible.

**If we have a conflict:** name it at stand-up, out loud, kindly. If it's still there next stand-up, Priya (TA) mediates. If it's about the product direction, it's Ada's call as pitcher and we move on.

## 7 · Commitment

We wrote this together, we mean it, and we'll revisit it at midterm and
update what isn't working.

| Signed            | Date       |
|-------------------|------------|
| Arunavo Chowdhury | 09/21/2026 |
| Brian Zhang       | 09/21/2026 |
| Hector Garcia     | 09/21/2026 |
| Zhiling Chen      | 09/21/2026 |