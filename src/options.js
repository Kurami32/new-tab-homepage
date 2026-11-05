const checkbox = document.getElementById("focusPage")
const { focusPage } = await browser.storage.local.get({ focusPage: false })
checkbox.checked = focusPage
checkbox.addEventListener("change", () =>
  browser.storage.local.set({ focusPage: checkbox.checked }),
)
