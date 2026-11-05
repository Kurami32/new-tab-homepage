const newTabPage = browser.runtime.getURL("new-tab.html")

// Allow embedding, but only for frames loaded by our new tab page
browser.webRequest.onHeadersReceived.addListener(
  details => {
    const parents = [
      details.documentUrl,
      details.originUrl,
      details.frameAncestors?.[0]?.url,
    ]
    if (!parents.some(u => u?.startsWith(newTabPage))) return {}

    const responseHeaders = []
    for (const header of details.responseHeaders) {
      const name = header.name.toLowerCase()
      if (name === "x-frame-options") continue
      if (name === "content-security-policy") {
        const value = header.value
          .split(";")
          .filter(d => !/^\s*frame-ancestors(\s|$)/i.test(d))
          .join(";")
        if (!value.trim()) continue
        responseHeaders.push({ name: header.name, value })
        continue
      }
      responseHeaders.push(header)
    }
    console.log(
      details.url,
      details.statusCode,
      "in:", details.responseHeaders.map(h => `${h.name}: ${h.value}`),
      "out:", responseHeaders.map(h => h.name),
    )
    return { responseHeaders }
  },
  { urls: ["http://*/*", "https://*/*"], types: ["sub_frame"] },
  ["blocking", "responseHeaders"],
)
