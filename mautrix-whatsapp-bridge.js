// Assume `data` contains the webhook JSON payload from Mautrix Whatsapp Bridge
// Assume `result` is already defined elsewhere

function formatTimestamp(ts) {
    if (!ts) return "Unknown";
    const date = new Date(ts);
    return date.toISOString();
}

function formatCheckpoint(cp) {
    return {
        plain: [
            `Timestamp: ${formatTimestamp(cp.timestamp)}`,
            `Step: ${cp.step || "N/A"}`,
            `Status: ${cp.status || "N/A"}`,
            `Reported By: ${cp.reported_by || "N/A"}`,
            `Event Type: ${cp.event_type || "N/A"}`,
            `Message Type: ${cp.message_type || "N/A"}`,
            `Retry #: ${cp.retry_num ?? "N/A"}`,
            `Room ID: ${cp.room_id || "N/A"}`,
            `Event ID: ${cp.event_id || "N/A"}`,
            `----------------------------------------`
        ].join('\n'),
        html: [
            `<b>Timestamp:</b> ${formatTimestamp(cp.timestamp)}`,
            `<b>Step:</b> ${cp.step || "N/A"}`,
            `<b>Status:</b> ${cp.status || "N/A"}`,
            `<b>Reported By:</b> ${cp.reported_by || "N/A"}`,
            `<b>Event Type:</b> ${cp.event_type || "N/A"}`,
            `<b>Message Type:</b> ${cp.message_type || "N/A"}`,
            `<b>Retry #:</b> ${cp.retry_num ?? "N/A"}`,
            `<b>Room ID:</b> <code>${cp.room_id || "N/A"}</code>`,
            `<b>Event ID:</b> <code>${cp.event_id || "N/A"}</code>`,
            `<hr style="border:1px dashed #ccc;">`
        ].join('<br>')
    };
}

// Main Handler
(() => {
    const checkpoints = Array.isArray(data.checkpoints) ? data.checkpoints : [];
    if (checkpoints.length === 0) {
        result = {
            version: "v2",
            empty: true,
            plain: "No checkpoints found in payload.",
            html: "<i>No checkpoints found in payload.</i>"
        };
        return;
    }

    // Process all checkpoints and join for output
    const formatted = checkpoints.map(formatCheckpoint);

    result = {
        version: "v2",
        empty: false,
        plain: formatted.map(f => f.plain).join('\n'),
        html: formatted.map(f => f.html).join('')
    };
})();
