# Welcome to Park Lane Charts

It's a directory of the Park Lane Big Band charts.
Built using Astro, and statically hosted with Netlify.

The only fancy thing really is fuse.js for the search indexing, autosuggesting and typo correcting.

## 🚀 Project Structure

You'll see the following folders and files:

```
/
├── src/
│   ├── components/
│   │   └── ChartsList.astro
│   └── pages/
│   │   └── index.astro
│   │       az.astro
│   │       [genre].astro
│   └── content/
│   │   └── charts.json
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Components can contain any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
|:----------------  |:-------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## 👀 Want to learn more about Astro?

Read [Astro documentation](https://github.com/withastro/astro) or jump into their [Discord server](https://astro.build/chat).
