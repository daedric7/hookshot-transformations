function formatFileSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

switch (data.eventType) {
    case "Health": {
        const errorLevel = data.level || "info"; // Default level to "info" if not provided
        const errorMessage = data.message || "No message provided.";
        const wikiUrl = data.wikiUrl || "";

        // Define emojis for different levels
        const levelEmojis = {
            "error": "❗",   // Error level
            "warning": "⚠️", // Warning level
            "info": "ℹ️"     // Info level
        };

        const emoji = levelEmojis[errorLevel.toLowerCase()] || "ℹ️";

        result = {
            version: "v2",
            empty: false,
            plain: `${emoji} **Health Check (${errorLevel}):**\n${errorMessage}\n${wikiUrl ? `See more: ${wikiUrl}` : ""}`,
            html: `${emoji} <b>Health Check (${errorLevel}):</b><br>${errorMessage}<br>${wikiUrl ? `<a href="${wikiUrl}">See more</a>` : ""}`
        };
        break;
    }
    case "Test": {
        const series = data.series || {};
        const episodes = data.episodes || [];
        const seriesTitle = series.title || "Unknown Series";
        const seriesPath = series.path || "Unknown Path";
        const episodeDetails = episodes.map(episode => {
            const episodeNumber = episode.episodeNumber || "Unknown";
            const seasonNumber = episode.seasonNumber || "Unknown";
            const episodeTitle = episode.title || "Unknown Title";
            return `S${seasonNumber}E${episodeNumber}: ${episodeTitle}`;
        }).join(",\n");

        result = {
            version: "v2",
            empty: false,
            plain: `🎥 **Test Event:**\nSeries: "${seriesTitle}"\nPath: "${seriesPath}"\nEpisodes:\n${episodeDetails}`,
            html: `🎥 <b>Test Event:</b><br>Series: "<i>${seriesTitle}</i>"<br>Path: "<code>${seriesPath}</code>"<br>Episodes:<br>${episodeDetails}`
        };
        break;
    }
    case "SeriesDelete": {
        const series = data.series || {};
        const seriesTitle = series.title || "Unknown Series";
        const seriesPath = series.path || "Unknown Path";
        const genres = (series.genres || []).join(", ") || "Unknown Genres";
        const originalLanguage = series.originalLanguage?.name || "Unknown Language";
        const deletedFiles = data.deletedFiles ? "Yes" : "No";

        result = {
            version: "v2",
            empty: false,
            plain: `🗑️ **Series Deleted:**\nTitle: "${seriesTitle}"\nLanguage: "${originalLanguage}"\nPath: "${seriesPath}"\nGenres: ${genres}\nDeleted Files: ${deletedFiles}`,
            html: `🗑️ <b>Series Deleted:</b><br>Title: "<i>${seriesTitle}</i>"<br>Language: "${originalLanguage}"<br>Path: "<code>${seriesPath}</code>"<br>Genres: ${genres}<br>Deleted Files: ${deletedFiles}`
        };
        break;
    }
    case "SeriesAdd": {
        const series = data.series || {};
        const seriesTitle = series.title || "Unknown Series";
        const seriesPath = series.path || "Unknown Path";
        const genres = (series.genres || []).join(", ") || "Unknown Genres";
        const originalLanguage = series.originalLanguage?.name || "Unknown Language";
        const releaseYear = series.year || "Unknown Year";

        result = {
            version: "v2",
            empty: false,
            plain: `➕ **New Series Added:**\nTitle: "${seriesTitle}"\nYear: ${releaseYear}\nLanguage: "${originalLanguage}"\nPath: "${seriesPath}"\nGenres: ${genres}`,
            html: `➕ <b>New Series Added:</b><br>Title: "<i>${seriesTitle}</i>"<br>Year: ${releaseYear}<br>Language: "${originalLanguage}"<br>Path: "<code>${seriesPath}</code>"<br>Genres: ${genres}`
        };
        break;
    }
    case "Grab": {
        const series = data.series || {};
        const episodes = data.episodes || [];
        const release = data.release || {};
        const seriesTitle = series.title || "Unknown Series";

        const episodeDetails = episodes.map(episode => {
            const episodeNumber = episode.episodeNumber || "Unknown";
            const seasonNumber = episode.seasonNumber || "Unknown";
            const episodeTitle = episode.title || "Unknown Title";
            return `S${seasonNumber}E${episodeNumber}: ${episodeTitle}\nTitle: "${episodeTitle}"\nOverview: "${episode.overview || "No overview available."}"`;
        }).join("\n\n");

        const releaseQuality = release.quality || "Unknown Quality";
        const releaseGroup = release.releaseGroup || "Unknown Group";
        const releaseTitle = release.releaseTitle || "Unknown Title";
        const indexer = release.indexer || "Unknown Indexer";
        const releaseSize = formatFileSize(release.size || 0);
        const releaseLanguages = (release.languages || []).map(lang => lang.name).join(", ") || "Unknown Languages";

        result = {
            version: "v2",
            empty: false,
            plain: `📥 **Grabbed Episode:**\nSeries: "${seriesTitle}"\nEpisodes:\n${episodeDetails}\n\nRelease Details:\nQuality: ${releaseQuality}\nGroup: ${releaseGroup}\nTitle: ${releaseTitle}\nIndexer: ${indexer}\nSize: ${releaseSize}\nLanguages: ${releaseLanguages}\nDownload Client: ${data.downloadClient || "Unknown Client"}`,
            html: `📥 <b>Grabbed Episode:</b><br>Series: "<i>${seriesTitle}</i>"<br>Episodes:<br>${episodeDetails.replace(/\n/g, "<br>")}<br><br>Release Details:<br>Quality: ${releaseQuality}<br>Group: ${releaseGroup}<br>Title: ${releaseTitle}<br>Indexer: ${indexer}<br>Size: ${releaseSize}<br>Languages: ${releaseLanguages}<br>Download Client: ${data.downloadClient || "Unknown Client"}`
        };
        break;
    }
    case "Download": {
        const series = data.series || {};
        const episodes = data.episodes || [];
        const episodeFiles = data.episodeFiles || [];
        const release = data.release || {};

        const seriesTitle = series.title || "Unknown Series";
        const episodeDetails = episodes.map(episode => {
            const episodeNumber = episode.episodeNumber || "Unknown";
            const seasonNumber = episode.seasonNumber || "Unknown";
            const episodeTitle = episode.title || "Unknown Title";
            return `S${seasonNumber}E${episodeNumber}: ${episodeTitle}\nTitle: "${episodeTitle}"\nOverview: "${episode.overview || "No overview available."}"`;
        }).join("\n\n");

        const fileDetails = episodeFiles.map(file => {
            const quality = file.quality || "Unknown Quality";
            const size = formatFileSize(file.size || 0);
            const filePath = file.path || "Unknown Path";
            const sceneName = file.sceneName || "Unknown Scene Name";
            const videoCodec = file.mediaInfo?.videoCodec || "Unknown Video Codec";
            const resolution = file.mediaInfo ? `${file.mediaInfo.width}x${file.mediaInfo.height}` : "Unknown Resolution";
            const audioCodec = file.mediaInfo?.audioCodec || "Unknown Audio Codec";
            const audioChannels = file.mediaInfo?.audioChannels || "Unknown Channels";
            const subtitles = (file.mediaInfo?.subtitles || []).join(", ") || "None";
            const audioLanguages = (file.mediaInfo?.audioLanguages || []).join(", ") || "Unknown Languages";

            return `Path: ${filePath}\nQuality: ${quality}\nSize: ${size}\nScene Name: ${sceneName}\nResolution: ${resolution}\nVideo Codec: ${videoCodec}\nAudio Codec: ${audioCodec}\nAudio Channels: ${audioChannels}\nAudio Languages: ${audioLanguages}\nSubtitles: ${subtitles}`;
        }).join("\n\n");

        const releaseTitle = release.releaseTitle || "Unknown Title";
        const indexer = release.indexer || "Unknown Indexer";
        const releaseSize = formatFileSize(release.size || 0);

        const sourcePath = data.sourcePath || "Unknown Source Path";
        const destinationPath = data.destinationPath || "Unknown Destination Path";

        result = {
            version: "v2",
            empty: false,
            plain: `✅ **Download Completed:**\nSeries: "${seriesTitle}"\nEpisodes:\n${episodeDetails}\n\nFile Details:\n${fileDetails}\n\nRelease Details:\nTitle: ${releaseTitle}\nIndexer: ${indexer}\nSize: ${releaseSize}\nSource Path: ${sourcePath}\nDestination Path: ${destinationPath}\nDownload Client: ${data.downloadClient || "Unknown Client"}`,
            html: `✅ <b>Download Completed:</b><br>Series: "<i>${seriesTitle}</i>"<br>Episodes:<br>${episodeDetails.replace(/\n/g, "<br>")}<br><br>File Details:<br>${fileDetails.replace(/\n/g, "<br>")}<br><br>Release Details:<br>Title: ${releaseTitle}<br>Indexer: ${indexer}<br>Size: ${releaseSize}<br>Source Path: ${sourcePath}<br>Destination Path: ${destinationPath}<br>Download Client: ${data.downloadClient || "Unknown Client"}`
        };
        break;
    }
    default: {
        result = {
            version: "v2",
            empty: false,
            plain: `Unknown event - ${data.eventType}\nPayload:\n${JSON.stringify(data, null, 2)}`,
            html: `<b>Unknown event:</b> ${data.eventType}<br><pre>${JSON.stringify(data, null, 2)}</pre>`
        };
        break;
    }
}
