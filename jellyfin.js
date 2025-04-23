const obj = JSON.parse(data);

function fullyDecode(value) {
    try {
        while (typeof value === "string" && value.includes("\\")) {
            value = JSON.parse(`"${value}"`); // Decode any escaped characters
        }
    } catch (error) {
        // If it fails, return as is (it's already clean)
    }
    return value || "N/A";
}

function buildResult(plain, html, msgtype = "m.notice", version = "v2") {
    return {
        version,
        plain,
        html,
        msgtype
    };
}

function handlePlaybackStart(obj) {
    const plainFields = [`User ${obj.NotificationUsername || "N/A"} is playing:`];
    let highlightedLabels = "";
    let generalInfoSection = "";
    let mediaSections = "";
    let deviceSection = "";

    const itemType = obj.ItemType || "Unknown";

    if (itemType === "Audio") {
        // Music/Audio handling (unchanged)
        plainFields.push(
            `Name: ${fullyDecode(obj.Name)}`,
            `Album: ${fullyDecode(obj.Album)}`,
            `Artist: ${fullyDecode(obj.Artist)}`,
            `Genres: ${obj.Genres || "N/A"}`,
            `Year: ${obj.Year || "N/A"}`,
            `Premiere Date: ${obj.PremiereDate || "N/A"}`,
            `Run Time: ${obj.RunTime || "N/A"}`,
            `Playback Position: ${obj.PlaybackPosition || "N/A"}`
        );

        highlightedLabels = `
            <b>User ${obj.NotificationUsername || "N/A"} is playing:</b><br>
            <b>Name</b>: ${fullyDecode(obj.Name)}<br>
            <b>Album</b>: ${fullyDecode(obj.Album)}<br>
            <b>Artist</b>: ${fullyDecode(obj.Artist)}<br>
        `;

        generalInfoSection = `
            <details>
                <summary><b>General Info</b></summary>
                <b>Genres</b>: ${obj.Genres || "N/A"}<br>
                <b>Year</b>: ${obj.Year || "N/A"}<br>
                <b>Premiere Date</b>: ${obj.PremiereDate || "N/A"}<br>
                <b>Run Time</b>: ${obj.RunTime || "N/A"}<br>
                <b>Playback Position</b>: ${obj.PlaybackPosition || "N/A"}
            </details>
        `;

        mediaSections += generateAudioDetails(obj);
    } else if (itemType === "Movie") {
        // Movie handling
        plainFields.push(
            `Name: ${fullyDecode(obj.Name)}`,
            `Tagline: ${fullyDecode(obj.Tagline)}`,
            `Overview: ${fullyDecode(obj.Overview)}`,
            `Genres: ${obj.Genres || "N/A"}`,
            `Year: ${obj.Year || "N/A"}`,
            `Premiere Date: ${obj.PremiereDate || "N/A"}`,
            `Run Time: ${obj.RunTime || "N/A"}`,
            `Playback Position: ${obj.PlaybackPosition || "N/A"}`
        );

        highlightedLabels = `
            <b>User ${obj.NotificationUsername || "N/A"} is watching:</b><br>
            <b>Name</b>: ${fullyDecode(obj.Name)}<br>
            <b>Tagline</b>: ${fullyDecode(obj.Tagline)}<br>
        `;

        generalInfoSection = `
            <details>
                <summary><b>General Info</b></summary>
                <b>Overview</b>: ${fullyDecode(obj.Overview)}<br>
                <b>Genres</b>: ${obj.Genres || "N/A"}<br>
                <b>Year</b>: ${obj.Year || "N/A"}<br>
                <b>Premiere Date</b>: ${obj.PremiereDate || "N/A"}<br>
                <b>Run Time</b>: ${obj.RunTime || "N/A"}<br>
                <b>Playback Position</b>: ${obj.PlaybackPosition || "N/A"}
            </details>
        `;

        mediaSections += generateVideoDetails(obj);
        mediaSections += generateAudioDetails(obj);
        mediaSections += generateSubtitleDetails(obj);
    } else if (itemType === "Episode") {
        // TV Show/Episode handling
        plainFields.push(
            `Series: ${fullyDecode(obj.SeriesName)}`,
            `Season: ${obj.SeasonNumber || "N/A"}`,
            `Episode: ${obj.EpisodeNumber || "N/A"}`,
            `Name: ${fullyDecode(obj.Name)}`,
            `Overview: ${fullyDecode(obj.Overview)}`,
            `Genres: ${obj.Genres || "N/A"}`,
            `Year: ${obj.Year || "N/A"}`,
            `Premiere Date: ${obj.PremiereDate || "N/A"}`,
            `Run Time: ${obj.RunTime || "N/A"}`,
            `Playback Position: ${obj.PlaybackPosition || "N/A"}`
        );

        highlightedLabels = `
            <b>User ${obj.NotificationUsername || "N/A"} is watching:</b><br>
            <b>Series</b>: ${fullyDecode(obj.SeriesName)}<br>
            <b>Season</b>: ${obj.SeasonNumber || "N/A"}<br>
            <b>Episode</b>: ${obj.EpisodeNumber || "N/A"}: ${fullyDecode(obj.Name)}<br>
        `;

        generalInfoSection = `
            <details>
                <summary><b>General Info</b></summary>
                <b>Overview</b>: ${fullyDecode(obj.Overview)}<br>
                <b>Genres</b>: ${obj.Genres || "N/A"}<br>
                <b>Year</b>: ${obj.Year || "N/A"}<br>
                <b>Premiere Date</b>: ${obj.PremiereDate || "N/A"}<br>
                <b>Run Time</b>: ${obj.RunTime || "N/A"}<br>
                <b>Playback Position</b>: ${obj.PlaybackPosition || "N/A"}
            </details>
        `;

        mediaSections += generateVideoDetails(obj);
        mediaSections += generateAudioDetails(obj);
        mediaSections += generateSubtitleDetails(obj);
    } else {
        // Handle other media types or unknown types
        plainFields.push(`Unknown media type: ${itemType}`);
        highlightedLabels = `<b>User ${obj.NotificationUsername || "N/A"} is playing an unknown media type.</b><br>`;
    }

    // Device Info (common to all media types)
    plainFields.push(
        `Device Name: ${obj.DeviceName || "N/A"}`,
        `Client Name: ${obj.ClientName || "N/A"}`,
        `Play Method: ${obj.PlayMethod || "N/A"}`,
        `Is Paused: ${obj.IsPaused ? "Yes" : "No"}`,
        `Timestamp: ${obj.Timestamp || "N/A"}`
    );

    deviceSection = `
        <details>
            <summary><b>Device Info</b></summary>
            <b>Device Name</b>: ${obj.DeviceName || "N/A"}<br>
            <b>Client Name</b>: ${obj.ClientName || "N/A"}<br>
            <b>Play Method</b>: ${obj.PlayMethod || "N/A"}<br>
            <b>Is Paused</b>: ${obj.IsPaused ? "Yes" : "No"}<br>
            <b>Timestamp</b>: ${obj.Timestamp || "N/A"}
        </details>
    `;

    const plain = plainFields.join("\n");
    const html = `
        ${highlightedLabels}
        ${generalInfoSection}
        ${mediaSections}
        ${deviceSection}
    `;

    return buildResult(plain, html);
}

// Helper function to generate audio details
function generateAudioDetails(obj) {
    let audioDetails = "";
    let index = 0;

    while (`Audio_${index}_Title` in obj) {
        audioDetails += `
            <b>Audio ${index + 1}:</b><br>
            <b>Title</b>: ${obj[`Audio_${index}_Title`] || "N/A"}<br>
            <b>Type</b>: ${obj[`Audio_${index}_Type`] || "N/A"}<br>
            <b>Language</b>: ${obj[`Audio_${index}_Language`] || "N/A"}<br>
            <b>Codec</b>: ${obj[`Audio_${index}_Codec`] || "N/A"}<br>
            <b>Channels</b>: ${obj[`Audio_${index}_Channels`] || "N/A"}<br>
            <b>Bitrate</b>: ${obj[`Audio_${index}_Bitrate`] || "N/A"}<br>
        `;
        index++;
    }

    if (audioDetails) {
        return `
            <details>
                <summary><b>Audio Info</b></summary>
                ${audioDetails}
            </details>
        `;
    }

    return "";
}

// Helper function to generate video details
function generateVideoDetails(obj) {
    let videoDetails = "";
    let index = 0;

    while (`Video_${index}_Title` in obj) {
        videoDetails += `
            <b>Video ${index + 1}:</b><br>
            <b>Title</b>: ${obj[`Video_${index}_Title`] || "N/A"}<br>
            <b>Type</b>: ${obj[`Video_${index}_Type`] || "N/A"}<br>
            <b>Codec</b>: ${obj[`Video_${index}_Codec`] || "N/A"}<br>
            <b>Resolution</b>: ${obj[`Video_${index}_Width`] || "N/A"}x${obj[`Video_${index}_Height`] || "N/A"}<br>
            <b>Aspect Ratio</b>: ${obj[`Video_${index}_AspectRatio`] || "N/A"}<br>
            <b>Frame Rate</b>: ${obj[`Video_${index}_FrameRate`] || "N/A"}<br>
        `;
        index++;
    }

    if (videoDetails) {
        return `
            <details>
                <summary><b>Video Info</b></summary>
                ${videoDetails}
            </details>
        `;
    }

    return "";
}

// Helper function to generate subtitle details
function generateSubtitleDetails(obj) {
    let subtitleDetails = "";
    let index = 0;

    while (`Subtitle_${index}_Title` in obj) {
        subtitleDetails += `
            <b>Subtitle ${index + 1}:</b><br>
            <b>Title</b>: ${obj[`Subtitle_${index}_Title`] || "N/A"}<br>
            <b>Language</b>: ${obj[`Subtitle_${index}_Language`] || "N/A"}<br>
            <b>Codec</b>: ${obj[`Subtitle_${index}_Codec`] || "N/A"}<br>
            <b>Default</b>: ${obj[`Subtitle_${index}_Default`] ? "Yes" : "No"}<br>
            <b>Forced</b>: ${obj[`Subtitle_${index}_Forced`] ? "Yes" : "No"}<br>
        `;
        index++;
    }

    if (subtitleDetails) {
        return `
            <details>
                <summary><b>Subtitle Info</b></summary>
                ${subtitleDetails}
            </details>
        `;
    }

    return "";
}

// Function to handle ItemDeleted notifications
function handleItemDeleted(obj) {
    const itemType = obj.ItemType || "Unknown";
    const title = fullyDecode(obj.Name) || "N/A";

    const plain = `${itemType} deleted:\nTitle: ${title}`;
    const html = `<b>${itemType} deleted:</b><br><b>Title</b>: ${title}`;
    return buildResult(plain, html);
}

function handleUnknown(obj) {
    const plain = `Unknown notification type: ${obj.NotificationType || "Unknown"}\nPayload:\n${JSON.stringify(obj, null, 2)}`;
    const html = `<b>Unknown notification type</b>: ${obj.NotificationType || "Unknown"}<br><pre>${JSON.stringify(obj, null, 2)}</pre>`;
    return buildResult(plain, html);
}

// Main switch logic
switch (obj.NotificationType) {
    case "PlaybackStart":
        result = handlePlaybackStart(obj);
        break;
    case "ItemDeleted":
        result = handleItemDeleted(obj);
        break;
    default:
        result = handleUnknown(obj);
        break;
}
