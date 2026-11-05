const thisTab = await browser.tabs.getCurrent()
const { focusPage } = await browser.storage.local.get({ focusPage: false })

const savedHomepage = (
  await browser.browserSettings.homepageOverride.get({})
).value
  .split("|")[0]
  .trim()
let startUrl = "about:blank"
if (/^https?:\/\//i.test(savedHomepage)) {
  startUrl = savedHomepage
} else if (savedHomepage && !/^[a-z][a-z\d+.-]*:(?!\d)/i.test(savedHomepage)) {
  startUrl = "https://" + savedHomepage
}
const newTabUrl = new URL(startUrl).href

if (focusPage) {
  await browser.tabs.create({ url: newTabUrl, index: thisTab.index })
  await browser.tabs.remove(thisTab.id)
} else {
  window.location.replace(newTabUrl)
}
