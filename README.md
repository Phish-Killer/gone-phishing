# Phish Killer

Phish Killer is a phishing analysis tool that keeps users who want a second
opinion on suspicious emails or links safe from threats.

**Live:** not deployed yet

<!-- TODO: one screenshot or GIF of the thing working.
     A README with a picture gets read; a wall of text gets skimmed. -->

## What it does (TODO)

<!-- TODO: One line per shipped feature, linking its spec — the spec is the full
     story, this list is the menu. Grows as features land. -->

- \<Feature — one user-visible sentence\> ([spec](docs/specs/<domain>/<feature>.md))
- \<Feature\> ([spec](docs/specs/<domain>/<feature>.md))

## Prerequisites

Phish Killer runs on Node.js and uses pnpm as its package manager. Before you
continue, please ensure you have both installed.

## Run it locally

No Docker, no cloud account — everything runs from npm.

```bash
pnpm install
pnpm prisma:generate     # typed DB client
pnpm dev                 # web + worker + your own Postgres + Azurite
pnpm db:seed             # demo data (with dev running)
```

Check it worked: `http://localhost:3000/api/health` → `{"status":"ok","db":"ok"}`.
All commands: see `package.json` scripts, or `CONTRIBUTING.md` for the
pre-push set (`pnpm test && pnpm typecheck && pnpm build`).

## How it's built (TODO)

<!-- TODO: Two or three sentences: the shape of your app in your words —
     what the web app does, what the worker does, what's in the database.
     Not a tour; a gist. -->

The deeper story lives in the docs, organized by the question you're asking —
decisions in [`docs/adr/`](docs/adr/), behavior in [`docs/specs/`](docs/specs/),
history in [`docs/postmortems/`](docs/postmortems/), procedures in
[`docs/runbooks/`](docs/runbooks/). Start at [`docs/README.md`](docs/README.md).

## Team

- \<Brian Zhang\> — \<[@Brian-Zhg](https://github.com/Brian-Zhg)\>
- \<Hector Garcia\> — \<[@hgarciasoftware](https://github.com/hgarciasoftware)\>
- \<Arunavo Chowdhury\> — \<[@iamarunavo](https://github.com/iamarunavo)\>
- \<Zhiling Chen\> — \<[@zhilingchen-elden](https://github.com/zhilingchen-elden)\>

## Contributing

Workflow, ground rules, and the documentation system: [`CONTRIBUTING.md`](CONTRIBUTING.md).
Agent conventions (any harness): [`AGENTS.md`](AGENTS.md).

---

<sub>Built on the CTP C12 full-stack starter — Next.js · Prisma · Postgres · Azure.</sub>
