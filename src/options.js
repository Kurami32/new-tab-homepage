import defaults from "./defaults.js"

const checkbox = document.getElementById("focusPage")
const color = document.getElementById("spinnerColor")
const backgroundType = document.getElementById("backgroundType")
const backgroundColor = document.getElementById("backgroundColor")
const backgroundColorRow = document.getElementById("backgroundColorRow")
const backgroundImage = document.getElementById("backgroundImage")
const backgroundImageRow = document.getElementById("backgroundImageRow")
const clearBackgroundImage = document.getElementById("clearBackgroundImage")
const imageStatus = document.getElementById("imageStatus")
const homepageSource = document.getElementById("homepageSource")
const customUrl = document.getElementById("customUrl")
const customUrlRow = document.getElementById("customUrlRow")
const privateUrlEnabled = document.getElementById("privateUrlEnabled")
const privateUrl = document.getElementById("privateUrl")
const privateUrlRow = document.getElementById("privateUrlRow")

const stored = await browser.storage.local.get(defaults)
checkbox.checked = stored.focusPage
color.value = stored.spinnerColor
backgroundType.value = stored.backgroundType
backgroundColor.value = stored.backgroundColor
imageStatus.textContent = stored.backgroundImage ? "Image set" : "No image"
homepageSource.value = stored.homepageSource
customUrl.value = stored.customUrl
privateUrlEnabled.checked = stored.privateUrlEnabled
privateUrl.value = stored.privateUrl

const updateVisibility = () => {
  customUrlRow.hidden = homepageSource.value !== "custom"
  privateUrlRow.hidden = !privateUrlEnabled.checked
  backgroundColorRow.hidden = backgroundType.value !== "color"
  backgroundImageRow.hidden = backgroundType.value !== "image"
}
updateVisibility()

checkbox.addEventListener("change", () =>
  browser.storage.local.set({ focusPage: checkbox.checked }),
)
color.addEventListener("change", () =>
  browser.storage.local.set({ spinnerColor: color.value }),
)
backgroundType.addEventListener("change", () => {
  updateVisibility()
  browser.storage.local.set({ backgroundType: backgroundType.value })
})
backgroundColor.addEventListener("change", () =>
  browser.storage.local.set({ backgroundColor: backgroundColor.value }),
)
backgroundImage.addEventListener("change", () => {
  const file = backgroundImage.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () =>
    browser.storage.local.set({ backgroundImage: reader.result }).then(
      () => (imageStatus.textContent = "Image set"),
      () => (imageStatus.textContent = "Image too large"),
    )
  reader.readAsDataURL(file)
})
clearBackgroundImage.addEventListener("click", () => {
  backgroundImage.value = ""
  imageStatus.textContent = "No image"
  browser.storage.local.set({ backgroundImage: "" })
})
homepageSource.addEventListener("change", () => {
  updateVisibility()
  browser.storage.local.set({ homepageSource: homepageSource.value })
})
customUrl.addEventListener("input", () =>
  browser.storage.local.set({ customUrl: customUrl.value }),
)
privateUrlEnabled.addEventListener("change", () => {
  updateVisibility()
  browser.storage.local.set({ privateUrlEnabled: privateUrlEnabled.checked })
})
privateUrl.addEventListener("input", () =>
  browser.storage.local.set({ privateUrl: privateUrl.value }),
)
