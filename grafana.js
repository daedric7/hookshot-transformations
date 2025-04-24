function transformPayload(data) {
  const status = data.status || "unknown";

  // Helper to convert labels to HTML list items
  function formatLabels(labels) {
    if (!labels || Object.keys(labels).length === 0) {
      return "<li><i>No labels available</i></li>";
    }
    return Object.entries(labels)
      .map(([key, value]) => `<li><b>${key}:</b> ${value}</li>`)
      .join("");
  }

  // Helper to include all remaining fields dynamically for both plain and HTML
  function formatAdditionalFields(fields) {
    if (!fields || Object.keys(fields).length === 0) {
      return { plain: "No additional fields", html: "<li><i>No additional fields</i></li>" };
    }
    const plain = Object.entries(fields)
      .map(([key, value]) => `- **${key}:** ${value || "N/A"}`)
      .join("\n");
    const html = Object.entries(fields)
      .map(([key, value]) => `<li><b>${key}:</b> ${value || "N/A"}</li>`)
      .join("");
    return { plain, html };
  }

  // Helper to format the message field for HTML
  function formatMessage(message) {
    if (!message) return "<p><i>No message provided</i></p>";

    // Break the message into lines for better readability
    const lines = message.split("\n").map((line) => {
      // Handle key-value pairs (e.g., "key = value")
      if (line.includes("=")) {
        const [key, value] = line.split("=").map((part) => part.trim());
        return `<li><b>${key}:</b> ${value}</li>`;
      }
      // Handle regular lines
      return `<p>${line.trim()}</p>`;
    });

    // Wrap the formatted lines in a list or paragraph
    return lines.join("");
  }

  // Extract additional fields from the payload that are not already handled
  const additionalFields = {
    "Dashboard URL": data.alerts[0]?.dashboardURL || "N/A",
    "Panel URL": data.alerts[0]?.panelURL || "N/A",
    "Silence URL": data.alerts[0]?.silenceURL || "N/A",
    "Generator URL": data.alerts[0]?.generatorURL || "N/A",
    "External URL": data.externalURL || "N/A",
    "Group Key": data.groupKey || "N/A",
    "Truncated Alerts": data.truncatedAlerts || "N/A",
    "Version": data.version || "N/A",
    "Value String": data.alerts[0]?.valueString || "N/A",
  };

  const formattedAdditionalFields = formatAdditionalFields(additionalFields);

  // Build the plain text and HTML outputs
  const plain = `
**Alert**
- **Status:** ${status}
- **Title:** ${data.title || "N/A"}
- **Message:** ${data.message || "N/A"}
- **Starts At:** ${data.alerts[0]?.startsAt || "N/A"}
- **Ends At:** ${data.alerts[0]?.endsAt || "N/A"}
- **Error:** ${data.commonAnnotations?.Error || "N/A"}
- **Description:** ${data.commonAnnotations?.description || "N/A"}
- **Summary:** ${data.commonAnnotations?.summary || "N/A"}
- **Labels:** ${Object.entries(data.commonLabels || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")}
${formattedAdditionalFields.plain}
  `;

  const html = `
<p><b>Title:</b> ${data.title || "N/A"}</p>
<p><b>Message:</b></p>
<ul>
  ${formatMessage(data.message)}
</ul>
<details>
  <summary><b>Alert Details</b></summary>
  <ul>
    <li><b>Status:</b> ${status}</li>
    <li><b>Starts At:</b> ${data.alerts[0]?.startsAt || "N/A"}</li>
    <li><b>Ends At:</b> ${data.alerts[0]?.endsAt || "N/A"}</li>
    <li><b>Value String:</b> ${data.alerts[0]?.valueString || "N/A"}</li>
    <li><b>Summary:</b> ${data.commonAnnotations?.summary || "N/A"}</li>
    <details>
      <summary><b>Labels</b></summary>
      <ul>
        ${formatLabels(data.commonLabels)}
      </ul>
    </details>
    <details>
      <summary><b>Additional Fields</b></summary>
      <ul>
        ${formattedAdditionalFields.html}
      </ul>
    </details>
  </ul>
</details>
  `;

  return {
    version: "v2",
    plain,
    html,
  };
}


result = transformPayload(data);
