if (data.account_name !== undefined) {
	const accountName = data.account_name || "Unknown Account";
	const elapsedTime = data.elapsed_time || "0";
	const streamsUpdated = data.streams_updated || "0";
	const totalProcessed = data.total_processed || "0";

	result = {
		version: "v2",
		empty: false,
		plain: `🔄 **Dispatcharr Account Sync:**\nAccount: "${accountName}"\nStreams Updated: ${streamsUpdated}\nTotal Processed: ${totalProcessed}\nElapsed Time: ${elapsedTime}s`,
		html: `🔄 <b>Dispatcharr Account Sync:</b><br>Account: "<i>${accountName}</i>"<br>Streams Updated: <code>${streamsUpdated}</code><br>Total Processed: <code>${totalProcessed}</code><br>Elapsed Time: <code>${elapsedTime}s</code>`
	};
} else if (data.source_name !== undefined) {
	const sourceName = data.source_name || "Unknown Source";
	const programs = data.programs || "0";
	const channels = data.channels || "0";
	const skippedPrograms = data.skipped_programs || "0";
	const unmappedChannels = data.unmapped_channels || "0";

	result = {
		version: "v2",
		empty: false,
		plain: `📡 **Dispatcharr Source Scan:**\nSource: "${sourceName}"\nChannels: ${channels}\nPrograms: ${programs}\nSkipped Programs: ${skippedPrograms}\nUnmapped Channels: ${unmappedChannels}`,
		html: `📡 <b>Dispatcharr Source Scan:</b><br>Source: "<i>${sourceName}</i>"<br>Channels: <code>${channels}</code><br>Programs: <code>${programs}</code><br>Skipped Programs: <code>${skippedPrograms}</code><br>Unmapped Channels: <code>${unmappedChannels}</code>`
	};
} else if (data.error_type !== undefined) {
	const errorType = data.error_type || "unknown";
	const channelName = data.channel_name || "Unknown Channel";
	const streamName = data.stream_name || "Unknown Stream";
	const attempts = data.attempts || "0";
	const failedUrl = data.url || "";
	const providerName = data.provider_name || "Unknown Provider";

	result = {
		version: "v2",
		empty: false,
		plain: `❌ **Dispatcharr Stream Error:**\nChannel: "${channelName}"\nStream: "${streamName}"\nProvider: ${providerName}\nError: ${errorType}\nAttempts: ${attempts}\nFailed URL: ${failedUrl}`,
		html: `❌ <b>Dispatcharr Stream Error:</b><br>Channel: "<i>${channelName}</i>"<br>Stream: "<i>${streamName}</i>"<br>Provider: <code>${providerName}</code><br>Error: <code>${errorType}</code><br>Attempts: <code>${attempts}</code><br>Failed URL: <code>${failedUrl}</code>`
	};
} else if (data.client_id !== undefined && data.stream_name !== undefined) {
	const clientId = data.client_id || "Unknown Client";
	const clientIp = data.client_ip || "Unknown IP";
	const channelName = data.channel_name || "Unknown Channel";
	const streamName = data.stream_name || "Unknown Stream";
	const providerName = data.provider_name || "Unknown Provider";
	const streamUrl = data.stream_url || "";

	result = {
		version: "v2",
		empty: false,
		plain: `✅ **Dispatcharr Stream Connected:**\nChannel: "${channelName}"\nStream: "${streamName}"\nProvider: ${providerName}\nClient: ${clientId} (${clientIp})\nURL: ${streamUrl}`,
		html: `✅ <b>Dispatcharr Stream Connected:</b><br>Channel: "<i>${channelName}</i>"<br>Stream: "<i>${streamName}</i>"<br>Provider: <code>${providerName}</code><br>Client: <code>${clientId}</code> (<code>${clientIp}</code>)<br>URL: <code>${streamUrl}</code>`
	};
} else if (data.client_id !== undefined) {
	const clientId = data.client_id || "Unknown Client";
	const clientIp = data.client_ip || "Unknown IP";
	const channelName = data.channel_name || "Unknown Channel";

	result = {
		version: "v2",
		empty: false,
		plain: `📺 **Dispatcharr Stream Requested:**\nChannel: "${channelName}"\nClient: ${clientId} (${clientIp})`,
		html: `📺 <b>Dispatcharr Stream Requested:</b><br>Channel: "<i>${channelName}</i>"<br>Client: <code>${clientId}</code> (<code>${clientIp}</code>)`
	};
} else if (data.runtime !== undefined) {
	const channelName = data.channel_name || "Unknown Channel";
	const runtime = parseFloat(data.runtime || "0").toFixed(2);
	const bytes = parseInt(data.total_bytes || "0", 10);
	const formatBytes = (b) => {
		if (b >= 1073741824) return (b / 1073741824).toFixed(2) + " GB";
		if (b >= 1048576) return (b / 1048576).toFixed(2) + " MB";
		if (b >= 1024) return (b / 1024).toFixed(2) + " KB";
		return b + " B";
	};
	const totalBytes = formatBytes(bytes);

	result = {
		version: "v2",
		empty: false,
		plain: `⏹️ **Dispatcharr Stream Disconnected:**\nChannel: "${channelName}"\nRuntime: ${runtime}s\nData Transferred: ${totalBytes}`,
		html: `⏹️ <b>Dispatcharr Stream Disconnected:</b><br>Channel: "<i>${channelName}</i>"<br>Runtime: <code>${runtime}s</code><br>Data Transferred: <code>${totalBytes}</code>`
	};
} else if (data.stream_id !== undefined) {
	const channelName = data.channel_name || "Unknown Channel";
	const streamName = data.stream_name || "Unknown Stream";
	const streamId = data.stream_id || "?";
	const providerName = data.provider_name || "Unknown Provider";
	const streamUrl = data.stream_url || "";

	result = {
		version: "v2",
		empty: false,
		plain: `🔀 **Dispatcharr Stream Switched:**\nChannel: "${channelName}"\nStream: "${streamName}" (ID: ${streamId})\nProvider: ${providerName}\nURL: ${streamUrl}`,
		html: `🔀 <b>Dispatcharr Stream Switched:</b><br>Channel: "<i>${channelName}</i>"<br>Stream: "<i>${streamName}</i>" (ID: <code>${streamId}</code>)<br>Provider: <code>${providerName}</code><br>URL: <code>${streamUrl}</code>`
	};
} else {
	result = {
		version: "v2",
		empty: false,
		plain: `Unknown Dispatcharr event\nPayload:\n${JSON.stringify(data, null, 2)}`,
		html: `<b>Unknown Dispatcharr event:</b><br><pre>${JSON.stringify(data, null, 2)}</pre>`
	};
}
