// Supported event types with enable/disable toggle
const supportedEvents = {
  "status.created": false, // Enable
  "report.updated": true, // Enable
  "report.created": true, // Enable new event
  "some.other.event": false, // Disable (example of a disabled event)
};

// Function to check if an event type is enabled
const isEventEnabled = (eventType) => supportedEvents[eventType] === true;

// Helper to create HTML <details> blocks
function createDetails(summary, content) {
  return `<details><summary>${summary}</summary>${content}</details>`;
}

// Main switch statement for processing events
switch (data.event) {
  case "status.created": {
    if (!isEventEnabled("status.created")) {
      result = { empty: true, version: "v2" };
      break;
    }
    const plain = JSON.stringify(data, null, 2);

    const account = data.object?.account || {};
    const application = data.object?.application || {};
    const mediaAttachments = data.object?.media_attachments || [];
    const contentHTML = data.object?.content || "";

    const username = `<p><b>Username:</b> ${account.username}</p>`;
    const displayName = `<p><b>Display Name:</b> ${account.display_name || "N/A"}</p>`;
    const content = `<div><b>Content:</b> ${contentHTML}</div>`;

    const accountDetails = `
      <p><b>Followers:</b> ${account.followers_count}</p>
      <p><b>Following:</b> ${account.following_count}</p>
      <p><b>Statuses:</b> ${account.statuses_count}</p>
      <p><b>Profile URL:</b> <a href="${account.url}" target="_blank">${account.url}</a></p>
      <img src="${account.avatar}" alt="Avatar" style="max-height:100px">
    `;

    const applicationDetails = `
      <p><b>Name:</b> ${application.name || "Unknown"}</p>
      <p><b>Website:</b> <a href="${application.website || "#"}" target="_blank">${application.website || "N/A"}</a></p>
    `;

    const mediaDetails = mediaAttachments
      .map(
        (media) => `
        <p><b>Type:</b> ${media.type}</p>
        <p><b>Description:</b> ${media.description || "N/A"}</p>
        <p><b>URL:</b> <a href="${media.url}" target="_blank">${media.url}</a></p>
        <img src="${media.preview_url}" alt="Media Preview" style="max-width:200px">
      `
      )
      .join("");

    const html = `
      ${username}
      ${displayName}
      ${content}
      ${createDetails("Account Details", accountDetails)}
      ${createDetails("Application Details", applicationDetails)}
      ${createDetails(
        "Media Attachments",
        mediaDetails || "<p>No Media Attachments</p>"
      )}
      <hr>
    `;

    result = {
      version: "v2",
      plain,
      html,
    };
    break;
  }

  case "report.updated": {
    if (!isEventEnabled("report.updated")) {
      result = { empty: true, version: "v2" };
      break;
    }
    const report = data.object || {};
    const account = report.account?.account || {};
    const actionTakenBy = report.action_taken_by_account?.account || {};
    const targetAccount = report.target_account?.account || {};

    const html = `
      <h2>Report Updated</h2>
      <p><b>Report ID:</b> ${report.id || "N/A"}</p>
      <p><b>Category:</b> ${report.category || "N/A"}</p>
      <p><b>Comment:</b> ${report.comment || "No comment provided"}</p>
      <p><b>Action Taken:</b> ${report.action_taken ? "Yes" : "No"}</p>
      <p><b>Action Taken At:</b> ${report.action_taken_at || "N/A"}</p>
      
      <h3>Reported Account</h3>
      <p><b>Username:</b> ${targetAccount.username || "N/A"}</p>
      <p><b>Followers:</b> ${targetAccount.followers_count || "N/A"}</p>
      <p><b>Following:</b> ${targetAccount.following_count || "N/A"}</p>
      <p><b>Statuses:</b> ${targetAccount.statuses_count || "N/A"}</p>
      <p><b>Profile URL:</b> <a href="${targetAccount.url || "#"}" target="_blank">${targetAccount.url || "N/A"}</a></p>
      
      <h3>Reporter Information</h3>
      <p><b>Username:</b> ${account.username || "N/A"}</p>
      <p><b>Domain:</b> ${report.account?.domain || "N/A"}</p>
      
      <h3>Action Taken By</h3>
      <p><b>Username:</b> ${actionTakenBy.username || "N/A"}</p>
      <p><b>Display Name:</b> ${actionTakenBy.display_name || "N/A"}</p>
      <p><b>Profile URL:</b> <a href="${actionTakenBy.url || "#"}" target="_blank">${actionTakenBy.url || "N/A"}</a></p>
      
      <hr>
    `;

    const plain = `
      Report Updated:
      - Report ID: ${report.id || "N/A"}
      - Category: ${report.category || "N/A"}
      - Comment: ${report.comment || "No comment provided"}
      - Action Taken: ${report.action_taken ? "Yes" : "No"}
      - Action Taken At: ${report.action_taken_at || "N/A"}

      Reported Account:
      - Username: ${targetAccount.username || "N/A"}
      - Followers: ${targetAccount.followers_count || "N/A"}
      - Following: ${targetAccount.following_count || "N/A"}
      - Statuses: ${targetAccount.statuses_count || "N/A"}
      - Profile URL: ${targetAccount.url || "N/A"}

      Reporter Information:
      - Username: ${account.username || "N/A"}
      - Domain: ${report.account?.domain || "N/A"}

      Action Taken By:
      - Username: ${actionTakenBy.username || "N/A"}
      - Display Name: ${actionTakenBy.display_name || "N/A"}
      - Profile URL: ${actionTakenBy.url || "N/A"}
    `;

    result = {
      version: "v2",
      plain,
      html,
    };
    break;
  }

  case "report.created": {
    if (!isEventEnabled("report.created")) {
      result = { empty: true, version: "v2" };
      break;
    }

    const report = data.object || {};
    const reporter = report.account?.account || {};
    const targetAccount = report.target_account?.account || {};
    const statuses = Array.isArray(report.statuses) ? report.statuses : [];

    // Reporter details
    const reporterHtml = `
      <p><b>Username:</b> ${reporter.username || "N/A"}</p>
      <p><b>Acct:</b> ${reporter.acct || "N/A"}</p>
      <p><b>Domain:</b> ${report.account?.domain || "N/A"}</p>
      <p><b>Profile URL:</b> <a href="${reporter.url || "#"}" target="_blank">${reporter.url || "N/A"}</a></p>
      <p><b>Followers:</b> ${reporter.followers_count || "N/A"}</p>
      <p><b>Following:</b> ${reporter.following_count || "N/A"}</p>
      <img src="${reporter.avatar || ""}" alt="Avatar" style="max-height:100px">
    `;

    // Target account details
    const targetHtml = `
      <p><b>Username:</b> ${targetAccount.username || "N/A"}</p>
      <p><b>Acct:</b> ${targetAccount.acct || "N/A"}</p>
      <p><b>Email:</b> ${report.target_account?.email || "N/A"}</p>
      <p><b>Profile URL:</b> <a href="${targetAccount.url || "#"}" target="_blank">${targetAccount.url || "N/A"}</a></p>
      <p><b>Followers:</b> ${targetAccount.followers_count || "N/A"}</p>
      <p><b>Following:</b> ${targetAccount.following_count || "N/A"}</p>
      <img src="${targetAccount.avatar || ""}" alt="Avatar" style="max-height:100px">
    `;

    // Statuses related to this report
    const statusHtml = statuses.map((status, idx) => {
      const acc = status.account || {};
      const app = status.application || {};
      const media = status.media_attachments || [];
      const tags = status.tags || [];

      const mediaHtml = media.map((m) =>
        `<p><b>Type:</b> ${m.type}</p>
        <p><b>Description:</b> ${m.description || "N/A"}</p>
        <p><b>URL:</b> <a href="${m.url}" target="_blank">${m.url}</a></p>
        <img src="${m.preview_url}" alt="Media Preview" style="max-width:200px">`
      ).join("");

      const tagsHtml = tags.length > 0
        ? `<p><b>Tags:</b> ${tags.map(t => `<a href="${t.url}" target="_blank">#${t.name}</a>`).join(", ")}</p>`
        : "";

      return `
        <div>
          <h4>Status #${idx + 1}</h4>
          <p><b>Content:</b> ${status.content || "N/A"}</p>
          <p><b>Created At:</b> ${status.created_at || "N/A"}</p>
          <p><b>URL:</b> <a href="${status.url || "#"}" target="_blank">${status.url || "N/A"}</a></p>
          <p><b>Application:</b> ${app.name || "N/A"} (${app.website ? `<a href="${app.website}" target="_blank">${app.website}</a>` : "N/A"})</p>
          ${tagsHtml}
          ${mediaHtml || "<p>No Media Attachments</p>"}
        </div>
        <hr>
      `;
    }).join("");

    const html = `
      <h2>Report Created</h2>
      <p><b>Report ID:</b> ${report.id || "N/A"}</p>
      <p><b>Created At:</b> ${report.created_at || "N/A"}</p>
      <p><b>Category:</b> ${report.category || "N/A"}</p>
      <p><b>Comment:</b> ${report.comment || "No comment provided"}</p>
      <p><b>Forwarded:</b> ${report.forwarded ? "Yes" : "No"}</p>
      ${createDetails("Reporter", reporterHtml)}
      ${createDetails("Target Account", targetHtml)}
      ${createDetails("Statuses", statusHtml || "<p>No statuses attached</p>")}
      <hr>
    `;

    // Build the plain text response
    const plain = `
      Report Created:
      - Report ID: ${report.id || "N/A"}
      - Created At: ${report.created_at || "N/A"}
      - Category: ${report.category || "N/A"}
      - Comment: ${report.comment || "No comment provided"}
      - Forwarded: ${report.forwarded ? "Yes" : "No"}

      Reporter:
      - Username: ${reporter.username || "N/A"}
      - Acct: ${reporter.acct || "N/A"}
      - Domain: ${report.account?.domain || "N/A"}
      - Profile URL: ${reporter.url || "N/A"}
      - Followers: ${reporter.followers_count || "N/A"}
      - Following: ${reporter.following_count || "N/A"}

      Target Account:
      - Username: ${targetAccount.username || "N/A"}
      - Acct: ${targetAccount.acct || "N/A"}
      - Email: ${report.target_account?.email || "N/A"}
      - Profile URL: ${targetAccount.url || "N/A"}
      - Followers: ${targetAccount.followers_count || "N/A"}
      - Following: ${targetAccount.following_count || "N/A"}

      Statuses:
      ${statuses.map((status, idx) => {
        const acc = status.account || {};
        const app = status.application || {};
        const tags = status.tags || [];
        return `
        #${idx + 1}:
        - Content: ${status.content || "N/A"}
        - Created At: ${status.created_at || "N/A"}
        - URL: ${status.url || "N/A"}
        - Application: ${app.name || "N/A"} (${app.website || "N/A"})
        - Tags: ${tags.map(t => `#${t.name}`).join(", ") || "N/A"}
        `;
      }).join("\n")}
    `;

    result = {
      version: "v2",
      plain,
      html,
    };
    break;
  }

  default:
    result = {
      plain: `*Unknown Event* - ${data.event}`,
      version: "v2",
    };
    break;
}
