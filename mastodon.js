switch (data.event) {
  case "status.created":
    // Helper function to create HTML <details> sections
    const createDetails = (title, content) =>
      `<details><summary>${title}</summary>${content}</details>`;

    // Extract fields from the payload
    const plain = JSON.stringify(data, null, 2); // Plain text representation of the entire payload

    const account = data.object.account;
    const application = data.object.application || {};
    const mediaAttachments = data.object.media_attachments || [];
    const contentHTML = data.object.content || "";

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

  default:
    // If the event type is not recognized, provide an unknown event message
    result = {
      plain: `*Unknown Event* - ${data.event}`,
      version: "v2",
    };
    break;
}
