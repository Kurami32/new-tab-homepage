# New Tab Homepage

A Firefox extension that opens your homepage URL in new tabs.

I know there's a lot of this same extension already, but I wanted to do my own anyways!
This is heavily inspired by those.

This extension has a few things:

- You can use your Firefox homepage _or_ a custom URL for new tabs.
- Optional separate URL for private windows
- A custom loading screen... yeah. While the page is loading you will see a loading spinner and you can also
  add a custom image as background if you want.
- An option to auto-focus your page.
- Available in English and Spanish

The options looks like this:

<img height="375" alt="screenshot_2026-11-05_19-04-20" src="https://github.com/user-attachments/assets/513ea1cf-1752-4e38-9074-5f9a264bd4c2" />


To install it you can go to [Releases](https://github.com/Kurami32/new-tab-homepage/releases) and download the `.xpi` file
and load it manually in `about:addons`. For now the extension isn't published in the Firefox store.

## Development

If you want to build this thing, test it, or make changes, here's a cheatsheet of the npm scripts:

```sh
npm install
npm start         # run in Firefox with web-ext
npm run lint      # check linting and formatting
npm run lint:fix  # apply biome fixes
npm run build     # build the extension zip
npm run sign      # sign as an unlisted add-on
```

And to load it as temporary addon if you want:

1. Open `about:debugging#/runtime/this-firefox` in the browser.
2. Click **Load Temporary Add-on** and select `src/manifest.json`.

## License

[MIT](LICENSE)
