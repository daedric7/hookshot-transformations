// Simple transformation for Epic Games PURCHASE payloads.
// Expects `data` to contain the incoming JSON payload.
// Produces a top-level `response` variable with a minimal plaintext summary.

// Helpers
function safe(v, alt = "N/A") {
  return v === undefined || v === null || v === "" ? alt : String(v);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (!data || typeof data !== "object") {
  response = {
    version: "v2",
    empty: true,
    plain: "No payload provided.",
    html: "<i>No payload provided.</i>"
  };
} else {
  const account = safe(data.account);
  const reason = safe(data.reason);
  const url = safe(data.url);

  // Build minimal plaintext output
  const plain = [
    `Account: ${account}`,
    `Reason: ${reason}`,
    `URL: ${url}`
  ].join("\n");

  // Also provide a simple HTML variant (optional)
  const html = [
    `<div><b>Account:</b> ${escapeHtml(account)}</div>`,
    `<div><b>Reason:</b> ${escapeHtml(reason)}</div>`,
    `<div><b>URL:</b> <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></div>`
  ].join("");

  response = {
    version: "v2",
    empty: false,
    plain,
    html
  };
}
