const frame = document.querySelector("iframe")
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

browser.webNavigation.onBeforeNavigate.addListener(
  nav => {
    if (
      nav.tabId === newTabUrl.id &&
      nav.frameId !== 0 &&
      nav.parentFrameId === 0 &&
      nav.url !== startHref
    ) {
      window.location.href = nav.url
    }
  },
  { url: [{ schemes: ["http", "https"] }] },
)

if (focusPage) {
  frame.addEventListener("load", () => frame.contentWindow.focus())
}
frame.src = startUrl
