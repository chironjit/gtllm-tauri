# Instructions for Agents

## What is this project about
GTLLM is an app that allows you to call multiple large language models at the same time in several modes, allowing the user to to evaluate the responses of one or more llms at the same time.

## Tech stack
Note the tech stack and utilise these for the choices you make in your code

| Technology    | Version | Module         | Purpose                                     |
| ------------  | ------- | -------------- | ------------------------------------------- |
| Tauri         | v2      |                | Desktop runtime                             |
| Vue           | v3      | vue            | Frontend framework                          |
| Theme Palette | latest  |                | Daisy UI themes (manual custom import)      |
| Components    | latest  | @ark-ui/vue    | Ark UI Vue                                  |
| Icons         | latest  | @lucide/vue    | Lucide Icons Vue                            |
| Code Highlight| latest  | nue-glow       | Nueglow                                     |
| Vite          | v7      |                | Build tool                                  |
| TypeScript    | v6      |                | Type safety                                 |
| Tailwind CSS  | v4      |                | Styling                                     |
| Vue Router    | v5      | vue-router     | Routing (`./src/router`)                    |
| Pinia         | v3      | pinia          | State management (`src/stores`)             |
| VueUse        | latest  | @vueuse/core   | Composable utilities (`/src/composables`)   |
| Vitest        | latest  |                | Unit testing                                |
| Playwright    | latest  |                | E2e testing                                 |
| ESLint        | v10     |                | JS/TS/Vue linting                           |
| Prettier      | v3      |                | Code formatting                             |
| Oxlint        | latest  |                | Fast supplemental linting                   |
| Lefthook      | latest  |                | Git hooks                                   |


## Function flow
The frontend of the stack should only be concerned with handling UI elements. Any functionality that is not UI-related must be handed off to the back via the Tauri IPC to be managed and completed. Once it is done, pass back the 

## Checking and linting
Here are the key commands to consider running (depending on the task) once you have made your changes to check that your changes are valid:

- `make lint`: run all linters (frontend and backend)
- `make build`: run build
- `make build-debug`: run debug build
- `make format-check`: check formatting
- `make format`: format code

## Skills
1. VueUse (`vueuse-functions`)
2. Ark UI (`ark-ui`)
3. Lucide Icons Vue (`lucide-vue`)
4. Neuglow (`neuglow`)
5. Pinia (`pinia`)
6. Vue (`vue`, `vue-best-practices`)
7. Vue Router (`vue-router-best-practices`)
