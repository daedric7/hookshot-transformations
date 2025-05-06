// Helper function to create HTML <details> sections
const createDetails = (title, content) =>
  `<details><summary>${title}</summary>${content}</details>`;

// Switch statement for handling different event types
switch (data.event) {
  case "status.created": {
    // Extract fields from the payload
    const plain = JSON.stringify(data, null, 2); // Plain text representation of the entire payload

    const account = data.object?.account || {};
    const application = data.object?.application || {};
    const mediaAttachments = data.object?.media_attachments || [];
    const contentHTML = data.object?.content || "";

    // Fields that appear outside <details>
    const username = `<p><b>Username:</b> ${account.username}</p>`;
    const displayName = `<p><b>Display Name:</b> ${account.display_name || "N/A"}</p>`;
    const content = `<div><b>Content:</b> ${contentHTML}</div>`;

    // Account Details (inside <details>)
    const accountDetails = `
      <p><b>Followers:</b> ${account.followers_count}</p>
      <p><b>Following:</b> ${account.following_count}</p>
      <p><b>Statuses:</b> ${account.statuses_count}</p>
      <p><b>Profile URL:</b> <a href="${account.url}" target="_blank">${account.url}</a></p>
      <img src="${account.avatar}" alt="Avatar" style="max-height:100px">
    `;

    // Application Details
    const applicationDetails = `
      <p><b>Name:</b> ${application.name || "Unknown"}</p>
      <p><b>Website:</b> <a href="${application.website || "#"}" target="_blank">${application.website || "N/A"}</a></p>
    `;

    // Media Attachments
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

    // Organize HTML with <details>
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

    // Store the result in the required format
    result = {
      version: "v2",
      plain,
      html,
    };
    break;
  }

  case "report.updated": {
    // Extract relevant fields from the report.updated payload
    const report = data.object || {};
    const account = report.account?.account || {};
    const actionTakenBy = report.action_taken_by_account?.account || {};
    const targetAccount = report.target_account?.account || {};

    // Build the HTML response
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

    // Build the plain text response
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

    // Return the structured result
    result = {
      version: "v2",
      plain,
      html,
    };
    break;
  }

  default:
    // If the event type is not recognized, provide an unknown event message
    result = {
      plain: `*Unknown Event* - ${data.event}`,
      version: "v2",
    };
    break;
}
