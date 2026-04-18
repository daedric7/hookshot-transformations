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
} else {
	result = {
		version: "v2",
		empty: false,
		plain: `Unknown Dispatcharr event\nPayload:\n${JSON.stringify(data, null, 2)}`,
		html: `<b>Unknown Dispatcharr event:</b><br><pre>${JSON.stringify(data, null, 2)}</pre>`
	};
}
