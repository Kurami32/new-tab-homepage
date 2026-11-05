import defaults from "./defaults.js"

const spinner = document.querySelector(".spinner")
const thisTab = await browser.tabs.getCurrent()
const {
  focusPage,
  spinnerColor,
  backgroundType,
  backgroundColor,
  backgroundImage,
  homepageSource,
  customUrl,
  privateUrlEnabled,
  privateUrl,
} = await browser.storage.local.get(defaults)
if (backgroundType === "color") {
  document.body.style.setProperty("--background-color", backgroundColor)
}
if (backgroundType === "image" && backgroundImage) {
  document.body.style.setProperty(
    "--background-image",
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${backgroundImage}")`,
  )
}
spinner.style.setProperty("--spinner", spinnerColor)
spinner.hidden = false

let savedHomepage = ""
if (thisTab.incognito && privateUrlEnabled) savedHomepage = privateUrl.trim()
if (!savedHomepage && homepageSource === "custom") {
  savedHomepage = customUrl.trim()
}
if (!savedHomepage) {
  savedHomepage = (await browser.browserSettings.homepageOverride.get({})).value
    .split("|")[0]
    .trim()
}

let newTabUrl = "about:blank"
try {
  if (/^https?:\/\//i.test(savedHomepage)) {
    newTabUrl = new URL(savedHomepage).href
  } else if (
    savedHomepage &&
    !/^[a-z][a-z\d+.-]*:(?!\d)/i.test(savedHomepage)
  ) {
    newTabUrl = new URL(`https://${savedHomepage}`).href
  }
} catch {}

if (focusPage) {
  // Load in the background while the spinner shows
  const tab = await browser.tabs.create({
    url: newTabUrl,
    index: thisTab.index + 1,
    windowId: thisTab.windowId,
    active: false,
  })
  let swapped = false
  const swap = async () => {
    if (swapped) return
    swapped = true
    await browser.tabs.update(tab.id, { active: true })
    await browser.tabs.remove(thisTab.id)
  }
  browser.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
    if (tabId !== tab.id || info.status !== "complete") return
    browser.tabs.onUpdated.removeListener(onUpdated)
    swap()
  })
  if ((await browser.tabs.get(tab.id)).status === "complete") swap()
} else {
  window.location.replace(newTabUrl)
}
