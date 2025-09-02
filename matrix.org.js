// Supported event types with enable/disable toggle
const supportedEvents = {
  "matrix.status_report": true, // Enable Matrix status report event
};

// Function to check if an event type is enabled
const isEventEnabled = (eventType) => supportedEvents[eventType] === true;

// Helper to create HTML <details> blocks
function createDetails(summary, content) {
  return `<details><summary>${summary}</summary>${content}</details>`;
}

// Helper to detect a Matrix status payload (incident, meta, page at top level)
function isMatrixIncidentPayload(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    obj.incident &&
    obj.meta &&
    obj.page
  );
}

// Main event type extraction: fallback to matrix.status_report if incident structure
let eventType = data.event;
let payload = data.object;

if (!eventType) {
  // Try to treat the top-level as payload if matches Matrix incident structure
  if (isMatrixIncidentPayload(data)) {
    eventType = "matrix.status_report";
    payload = data;
  }
}

// Main switch statement for processing events
switch (eventType) {
  case "matrix.status_report": {
    if (!isEventEnabled("matrix.status_report")) {
      result = { empty: true, version: "v2" };
      break;
    }

    payload = payload || {};
    const incident = payload.incident || {};
    const page = payload.page || {};
    const meta = payload.meta || {};
    const components = incident.components || [];
    const updates = incident.incident_updates || [];

    // Incident summary
    const incidentSummary = `
      <p><b>Incident:</b> ${incident.name || "N/A"}</p>
      <p><b>Status:</b> ${incident.status || "N/A"}</p>
      <p><b>Impact:</b> ${incident.impact || "N/A"}</p>
      <p><b>Started At:</b> ${incident.started_at || "N/A"}</p>
      <p><b>Resolved At:</b> ${incident.resolved_at || "N/A"}</p>
      <p><b>Shortlink:</b> <a href="${incident.shortlink || "#"}" target="_blank">${incident.shortlink || "N/A"}</a></p>
      <p><b>Status Page:</b> <a href="https://status.matrix.org/" target="_blank">status.matrix.org</a></p>
    `;

    // Page meta
    const pageSummary = `
      <p><b>Status Indicator:</b> ${page.status_indicator || "N/A"}</p>
      <p><b>Status Description:</b> ${page.status_description || "N/A"}</p>
      <p><b>Unsubscribe:</b> <a href="${meta.unsubscribe || "#"}" target="_blank">${meta.unsubscribe || "N/A"}</a></p>
      <p><b>Documentation:</b> <a href="${meta.documentation || "#"}" target="_blank">${meta.documentation || "N/A"}</a></p>
      <p><b>Generated At:</b> ${meta.generated_at || "N/A"}</p>
    `;

    // Components
    const componentHtml = components.map((comp) => `
      <p><b>Name:</b> ${comp.name || "N/A"}</p>
      <p><b>Status:</b> ${comp.status || "N/A"}</p>
      <p><b>Description:</b> ${comp.description || "N/A"}</p>
      <p><b>Showcase:</b> ${comp.showcase ? "Yes" : "No"}</p>
      <p><b>Created At:</b> ${comp.created_at || "N/A"}</p>
      <p><b>Updated At:</b> ${comp.updated_at || "N/A"}</p>
      <hr>
    `).join("");

    // Incident Updates
    const updatesHtml = updates.map((upd, idx) => {
      const affected = upd.affected_components || [];
      const affectedHtml = affected.map(acomp => `
        <p><b>Component:</b> ${acomp.name || "N/A"}</p>
        <p><b>Old Status:</b> ${acomp.old_status || "N/A"}</p>
        <p><b>New Status:</b> ${acomp.new_status || "N/A"}</p>
      `).join("");
      return `
        <div>
          <h4>Update #${idx + 1}: ${upd.status || "N/A"}</h4>
          <p><b>Time:</b> ${upd.created_at || "N/A"}</p>
          <p>${upd.body || ""}</p>
          ${createDetails("Affected Components", affectedHtml || "<p>None</p>")}
        </div>
        <hr>
      `;
    }).join("");

    // HTML Output
    const html = `
      <h2>Matrix.org Status Report</h2>
      ${createDetails("Incident Summary", incidentSummary)}
      ${createDetails("Page Info", pageSummary)}
      ${createDetails("Components", componentHtml || "<p>No components listed</p>")}
      ${createDetails("Incident Updates", updatesHtml || "<p>No updates</p>")}
      <hr>
    `;

    // Plain Output
    const plain = `
      Matrix.org Status Report
      Incident: ${incident.name || "N/A"}
      Status: ${incident.status || "N/A"}
      Impact: ${incident.impact || "N/A"}
      Started At: ${incident.started_at || "N/A"}
      Resolved At: ${incident.resolved_at || "N/A"}
      Shortlink: ${incident.shortlink || "N/A"}
      Status Indicator: ${page.status_indicator || "N/A"}
      Status Description: ${page.status_description || "N/A"}
      Components:
      ${components.map(comp => `- ${comp.name || "N/A"}: ${comp.status || "N/A"}`).join("\n")}
      Updates:
      ${updates.map((upd, idx) => `
        #${idx + 1} [${upd.status || "N/A"}] at ${upd.created_at || "N/A"}
        ${upd.body || ""}
        ${upd.affected_components?.map(acomp => `* ${acomp.name || "N/A"}: ${acomp.old_status || "N/A"} → ${acomp.new_status || "N/A"}`).join("\n") || ""}
      `).join("\n")}
      Unsubscribe: ${meta.unsubscribe || "N/A"}
      Documentation: ${meta.documentation || "N/A"}
      Generated At: ${meta.generated_at || "N/A"}
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
      plain: `*Unknown Event* - ${eventType}`,
      version: "v2",
    };
    break;
}
