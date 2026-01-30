// utils.mjs
// load header and footer partials

export async function loadHeaderFooter() {
  const header = await fetch(
    "/wdd330-sleepoutside-team02/src/public/partials/header.html",
  );
  const headerText = await header.text();
  document.querySelector("#main-header").innerHTML = headerText;

  const footer = await fetch(
    "/wdd330-sleepoutside-team02/src/public/partials/footer.html",
  );
  const footerText = await footer.text();
  document.querySelector("#main-footer").innerHTML = footerText;
}

// helper to read query parameters from the URL

export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

