# Copilot / AI Agent Instructions for this repository

Purpose: provide concise, actionable guidance so an AI coding agent can be immediately productive working with Playwright tests in this codebase.

- Project type: Playwright + TypeScript end-to-end tests. Key files: `playwright.config.ts`, `package.json`, `fixtures/baseTest.ts`, `pages/*`, `tests/*`, `utils/*`.

- How tests are organized
  - Tests live under `tests/`. `playwright.config.ts` sets `testDir: './tests'` and `testMatch: /spec\.ts/` so generated specs should include `spec.ts` in their filename.
  - Base fixtures are in `fixtures/baseTest.ts`. The project extends Playwright fixtures to expose page-objects as fixtures: `loginPage` and `dashboardPage`.

- Page Object pattern
  - Page classes are in `pages/` and follow the Page Object Model. Examples: `pages/LoginPage.ts` and `pages/DashboardPage.ts`.
  - Each page class is initialized in `baseTest.ts` via `new LoginPage(page, baseURL)` and provided to tests as fixtures. Use those fixtures in tests rather than creating new page objects directly.

- Naming & file placement rules (important for automatic tools)
  - Tests should be placed under `tests/` and filenames should match the configured regex (include `spec.ts`).
  - When generating a test file, put a single `test.describe` block matching the logical group and a single `test` per file when using generation agents (project agents expect that pattern).

- Test step instrumentation and decorators
  - Several page methods use a `@step(...)` decorator from `utils/step-decorators.ts`. This decorator wraps methods with `test.step(...)` and supports placeholder substitution (e.g. `@step("Login user: {username}")`).
  - Preserve decorator usage in generated tests and avoid duplicating step comments: prefer calling page methods (their own internal steps will be recorded).
  - There is also a `boxedStep` decorator in `utils/decorators.ts` that uses `test.step(..., { box: true })` — use it only when you need boxed grouping.

- Runtime and execution notes
  - The `playwright.config.ts` sets `baseURL: "http://localhost:8080"`, `headless: true`, `trace: 'on-first-retry'` and `reporter: 'html'`. Tests assume the app runs at that `baseURL` unless overridden.
  - Install deps with `npm ci`. Run browsers with `npx playwright install --with-deps` if needed. Run tests with `npx playwright test`.
  - CI workflow `.github/workflows/copilot-setup-steps.yml` installs dependencies and runs `npx playwright install --with-deps`. Note: the workflow calls `npx run build` but `package.json` currently has no `build` script — confirm or skip build step when running locally.

- Conventions & examples agents should follow
  - Prefer reusing fixtures: example in `tests/UIBasicstest.spec.ts` uses `test` imported from `fixtures/baseTest` and consumes `{ loginPage, dashboardPage, page }`.
  - Use page object methods rather than in-test low-level selectors. E.g. call `await loginPage.login(username, password)` instead of performing the clicks/fills inline — this keeps logs/steps consistent and leverages `@step` instrumentation.
  - When selecting elements, the codebase uses Playwright locators like `page.getByPlaceholder(...)`, `page.getByRole('button', { name: 'Login' })`, and `page.locator('a.card[href="/Projects"]')`. Follow these locator styles (semantic locators where available).
  - Tests often clear cookies/context to reset state: `await page.context().clearCookies()`; follow that pattern for fresh-state tests.

- Edge cases & what NOT to change
  - Do not remove or duplicate the `@step` annotations — they produce structured test steps and are used by generator/healer agents.
  - Do not change `testDir` or `testMatch` naming unless you also update generator agents and CI workflows.

- Integration points & agent-specific hints
  - There are agent descriptors in `.github/agents/` (test-planner, test-healer, test-generator). Generated tests and plans should reference seed files under `tests/` and plans under `specs/` (see `specs/README.md`).
  - When producing new tests, include a comment header referencing the spec and seed like the repository's agent examples: `// spec: specs/plan.md` and `// seed: tests/seed.spec.ts`.

- Quick checklist for generating or editing tests
  1. Place file under `tests/` and name it with `spec.ts` suffix (matching `testMatch`).
 2. Use fixtures from `fixtures/baseTest.ts` (e.g., `test('...', async ({ loginPage, dashboardPage }) => { ... })`).
 3. Prefer page methods (e.g., `loginPage.login(...)`) to keep steps recorded.
 4. Use `get_user_credentials()` from `utils/constants.ts` for example users.

If anything above is unclear or you'd like the file to follow a different template (more/less detail), tell me which sections to expand or revise. I'll iterate.
