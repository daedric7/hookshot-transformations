function formatFileSize(bytes) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "0 Bytes";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

switch (data.eventType) {
	case "Test": {
		const movie = data.movie || {};
		const release = data.release || {};
		const remoteMovie = data.remoteMovie || {};

		// Movie Details
		const movieTitle = movie.title || "Unknown Title";
		const movieYear = movie.year || "Unknown Year";
		const moviePath = movie.folderPath || "Unknown Path";

		// Release Details
		const releaseTitle = release.releaseTitle || "Unknown Title";
		const releaseGroup = release.releaseGroup || "Unknown Group";
		const releaseQuality = release.quality || "Unknown Quality";
		const releaseSize = formatFileSize(release.size || 0);
		const indexer = release.indexer || "Unknown Indexer";

		// Remote Movie Details
		const remoteMovieTitle = remoteMovie.title || "Unknown Title";
		const remoteMovieYear = remoteMovie.year || "Unknown Year";

		result = {
			version: "v2",
			empty: false,
			plain: `🎥 **Test Event:**\nMovie: "${movieTitle}" (${movieYear})\nPath: "${moviePath}"\n\nRelease Details:\nTitle: ${releaseTitle}\nGroup: ${releaseGroup}\nQuality: ${releaseQuality}\nSize: ${releaseSize}\nIndexer: ${indexer}\n\nRemote Movie:\nTitle: "${remoteMovieTitle}" (${remoteMovieYear})`,
			html: `🎥 <b>Test Event:</b><br>Movie: "<i>${movieTitle}</i>" (${movieYear})<br>Path: "<code>${moviePath}</code>"<br><br>Release Details:<br>Title: ${releaseTitle}<br>Group: ${releaseGroup}<br>Quality: ${releaseQuality}<br>Size: ${releaseSize}<br>Indexer: ${indexer}<br><br>Remote Movie:<br>Title: "<i>${remoteMovieTitle}</i>" (${remoteMovieYear})`
		};
		break;
	}
	case "MovieDelete": {
		const movie = data.movie || {};
		const movieTitle = movie.title || "Unknown Title";
		const movieYear = movie.year || "Unknown Year";
		const moviePath = movie.folderPath || "Unknown Path";
		const genres = (movie.genres || []).join(", ") || "Unknown Genres";
		const overview = movie.overview || "No overview available.";
		const originalLanguage = movie.originalLanguage?.name || "Unknown Language";
		const deletedFiles = data.deletedFiles ? "Yes" : "No";
		const movieFolderSize = formatFileSize(data.movieFolderSize || 0);

		result = {
			version: "v2",
			empty: false,
			plain: `🗑️ **Movie Deleted:**\nTitle: "${movieTitle}" (${movieYear})\nLanguage: "${originalLanguage}"\nPath: "${moviePath}"\nGenres: ${genres}\nOverview: "${overview}"\nDeleted Files: ${deletedFiles}\nFolder Size: ${movieFolderSize}`,
			html: `🗑️ <b>Movie Deleted:</b><br>Title: "<i>${movieTitle}</i>" (${movieYear})<br>Language: "${originalLanguage}"<br>Path: "<code>${moviePath}</code>"<br>Genres: ${genres}<br>Overview: "${overview}"<br>Deleted Files: ${deletedFiles}<br>Folder Size: ${movieFolderSize}`
		};
		break;
	}
	case "MovieFileDelete": {
		const movie = data.movie || {};
		const movieTitle = movie.title || "Unknown Title";
		const movieYear = movie.year || "Unknown Year";
		const moviePath = movie.folderPath || "Unknown Path";
		const genres = (movie.genres || []).join(", ") || "Unknown Genres";
		const overview = movie.overview || "No overview available.";
		const imdbId = movie.imdbId ? `https://www.imdb.com/title/${movie.imdbId}` : "Unavailable";
		const tmdbId = movie.tmdbId ? `https://www.themoviedb.org/movie/${movie.tmdbId}` : "Unavailable";
		const originalLanguage = movie.originalLanguage?.name || "Unknown Language";
		const movieFile = data.movieFile || {};
		const movieFolderSize = formatFileSize(movieFile.size || 0);

		result = {
			version: "v2",
			empty: false,
			plain: `🗑️ **Movie File Deleted:**\nTitle: "${movieTitle}" (${movieYear})\nLanguage: "${originalLanguage}"\nPath: "${moviePath}"\nGenres: ${genres}\nOverview: "${overview}"\nDeleted Files: ${deletedFiles}\nFolder Size: ${movieFolderSize}`,
			html: `🗑️ <b>Movie File Deleted:</b><br>Title: "<i>${movieTitle}</i>" (${movieYear})<br>Language: "${originalLanguage}"<br>Path: "<code>${moviePath}</code>"<br>Genres: ${genres}<br>Overview: "${overview}"<br>Deleted Files: ${deletedFiles}<br>Folder Size: ${movieFolderSize}`
		};
		break;
	}
	case "MovieAdded": {
		const movie = data.movie || {};
		const movieTitle = movie.title || "Unknown Title";
		const movieYear = movie.year || "Unknown Year";
		const moviePath = movie.folderPath || "Unknown Path";
		const genres = (movie.genres || []).join(", ") || "Unknown Genres";
		const overview = movie.overview || "No overview available.";
		const imdbId = movie.imdbId ? `https://www.imdb.com/title/${movie.imdbId}` : "Unavailable";
		const tmdbId = movie.tmdbId ? `https://www.themoviedb.org/movie/${movie.tmdbId}` : "Unavailable";
		const originalLanguage = movie.originalLanguage?.name || "Unknown Language";
		const addMethod = data.addMethod || "Unknown Add Method";

		result = {
			version: "v2",
			empty: false,
			plain: `➕ **Movie Added:**\nTitle: "${movieTitle}" (${movieYear})\nLanguage: "${originalLanguage}"\nPath: "${moviePath}"\nGenres: ${genres}\nOverview: "${overview}"\nAdded via: ${addMethod}\nIMDb: ${imdbId}\nTMDb: ${tmdbId}`,
			html: `➕ <b>Movie Added:</b><br>Title: "<i>${movieTitle}</i>" (${movieYear})<br>Language: "${originalLanguage}"<br>Path: "<code>${moviePath}</code>"<br>Genres: ${genres}<br>Overview: "${overview}"<br>Added via: ${addMethod}<br>IMDb: <a href="${imdbId}" target="_blank">${imdbId}</a><br>TMDb: <a href="${tmdbId}" target="_blank">${tmdbId}</a>`
		};
		break;
	}
	case "Grab": {
		const movie = data.movie || {};
		const release = data.release || {};
		const movieTitle = movie.title || "Unknown Title";
		const movieYear = movie.year || "Unknown Year";
		const releaseTitle = release.releaseTitle || "Unknown Title";
		const releaseGroup = release.releaseGroup || "Unknown Group";
		const releaseQuality = release.quality || "Unknown Quality";
		const releaseSize = formatFileSize(release.size || 0);
		const languages = (release.languages || []).map(lang => lang.name).join(", ") || "Unknown Languages";
		const downloadClient = data.downloadClient || "Unknown Client";

		result = {
			version: "v2",
			empty: false,
			plain: `📥 **Grab Event:**\nMovie: "${movieTitle}" (${movieYear})\n\nRelease Details:\nTitle: ${releaseTitle}\nGroup: ${releaseGroup}\nQuality: ${releaseQuality}\nSize: ${releaseSize}\nLanguages: ${languages}\nDownload Client: ${downloadClient}`,
			html: `📥 <b>Grab Event:</b><br>Movie: "<i>${movieTitle}</i>" (${movieYear})<br><br>Release Details:<br>Title: ${releaseTitle}<br>Group: ${releaseGroup}<br>Quality: ${releaseQuality}<br>Size: ${releaseSize}<br>Languages: ${languages}<br>Download Client: ${downloadClient}`
		};
		break;
	}
	case "ManualInteractionRequired": {
		const downloadInfo = data.downloadInfo || {};
		const downloadClient = data.downloadClient || "Unknown Client";
		const downloadStatus = data.downloadStatus || "Unknown Status";
		const downloadStatusMessages = data.downloadStatusMessages || [];
		const fileName = downloadInfo.title || "Unknown File";
		const fileQuality = downloadInfo.quality || "Unknown Quality";
		const fileSize = formatFileSize(downloadInfo.size || 0);

		// Collect all messages
		const messages = downloadStatusMessages.map(status => {
			const title = status.title || "Unknown Title";
			const messageList = (status.messages || []).join("; ");
			return `Title: "${title}" - Messages: "${messageList}"`;
		}).join("\n");

		result = {
			version: "v2",
			empty: false,
			plain: `⚠️ **Manual Interaction Required:**\nDownload Status: ${downloadStatus}\nFile: "${fileName}"\nQuality: ${fileQuality}\nSize: ${fileSize}\nDownload Client: ${downloadClient}\n\nMessages:\n${messages}`,
			html: `⚠️ <b>Manual Interaction Required:</b><br>Download Status: ${downloadStatus}<br>File: "<i>${fileName}</i>"<br>Quality: ${fileQuality}<br>Size: ${fileSize}<br>Download Client: ${downloadClient}<br><br>Messages:<br>${messages.replace(/\n/g, "<br>")}`
		};
		break;
	}
	case "Download": {
		const movie = data.movie || {};
		const movieFile = data.movieFile || {};
		const release = data.release || {};

		// Movie Details
		const movieTitle = movie.title || "Unknown Title";
		const movieYear = movie.year || "Unknown Year";
		const overview = movie.overview || "No overview available.";
		const genres = (movie.genres || []).join(", ") || "Unknown Genres";
		const originalLanguage = movie.originalLanguage?.name || "Unknown Language";
		const imdbId = movie.imdbId ? `https://www.imdb.com/title/${movie.imdbId}` : "Unavailable";
		const tmdbId = movie.tmdbId ? `https://www.themoviedb.org/movie/${movie.tmdbId}` : "Unavailable";

		// Movie File Details
		const filePath = movieFile.path || "Unknown Path";
		const fileQuality = movieFile.quality || "Unknown Quality";
		const releaseGroup = movieFile.releaseGroup || "Unknown Group";
		const sceneName = movieFile.sceneName || "Unknown Scene Name";
		const fileSize = formatFileSize(movieFile.size || 0);
		const fileLanguages = (movieFile.languages || []).map(lang => lang.name).join(", ") || "Unknown Languages";

		// Media Info
		const videoCodec = movieFile.mediaInfo?.videoCodec || "Unknown Video Codec";
		const audioCodec = movieFile.mediaInfo?.audioCodec || "Unknown Audio Codec";
		const audioChannels = movieFile.mediaInfo?.audioChannels || "Unknown Channels";
		const subtitles = (movieFile.mediaInfo?.subtitles || []).join(", ") || "None";

		// Release Details
		const releaseTitle = release.releaseTitle || "Unknown Title";
		const releaseIndexer = release.indexer || "Unknown Indexer";
		const releaseSize = formatFileSize(release.size || 0);

		// Other Important Details
		const isUpgrade = data.isUpgrade ? "Yes" : "No";
		const downloadClient = data.downloadClient || "Unknown Client";

		result = {
			version: "v2",
			empty: false,
			plain: `✅ **Download Completed:**\nMovie: "${movieTitle}" (${movieYear})\nLanguage: ${originalLanguage}\nOverview: "${overview}"\nGenres: ${genres}\nIMDb: ${imdbId}\nTMDb: ${tmdbId}\n\nMovie File Details:\nPath: "${filePath}"\nQuality: ${fileQuality}\nRelease Group: ${releaseGroup}\nScene Name: ${sceneName}\nSize: ${fileSize}\nLanguages: ${fileLanguages}\n\nMedia Info:\nVideo Codec: ${videoCodec}\nAudio Codec: ${audioCodec}\nAudio Channels: ${audioChannels}\nSubtitles: ${subtitles}\n\nRelease Details:\nTitle: ${releaseTitle}\nIndexer: ${releaseIndexer}\nSize: ${releaseSize}\n\nOther Details:\nUpgrade: ${isUpgrade}\nDownload Client: ${downloadClient}`,
			html: `✅ <b>Download Completed:</b><br>Movie: "<i>${movieTitle}</i>" (${movieYear})<br>Language: ${originalLanguage}<br>Overview: "${overview}"<br>Genres: ${genres}<br>IMDb: <a href="${imdbId}" target="_blank">${imdbId}</a><br>TMDb: <a href="${tmdbId}" target="_blank">${tmdbId}</a><br><br>Movie File Details:<br>Path: "<code>${filePath}</code>"<br>Quality: ${fileQuality}<br>Release Group: ${releaseGroup}<br>Scene Name: ${sceneName}<br>Size: ${fileSize}<br>Languages: ${fileLanguages}<br><br>Media Info:<br>Video Codec: ${videoCodec}<br>Audio Codec: ${audioCodec}<br>Audio Channels: ${audioChannels}<br>Subtitles: ${subtitles}<br><br>Release Details:<br>Title: ${releaseTitle}<br>Indexer: ${releaseIndexer}<br>Size: ${releaseSize}<br><br>Other Details:<br>Upgrade: ${isUpgrade}<br>Download Client: ${downloadClient}`
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
