switch (data.eventType) {
	case "Test": {
		const instanceName = data.instanceName || "Unknown Instance";

		result = {
			version: "v2",
			empty: false,
			plain: `✅ **Test Event:**\nInstance: "${instanceName}"`,
			html: `✅ <b>Test Event:</b><br>Instance: "<i>${instanceName}</i>"`
		};
		break;
	}
	case "ApplicationUpdate": {
		const instanceName = data.instanceName || "Unknown Instance";
		const message = data.message || "Application updated";
		const previousVersion = data.previousVersion || "Unknown Version";
		const newVersion = data.newVersion || "Unknown Version";

		result = {
			version: "v2",
			empty: false,
			plain: `🔄 **Application Update:**\nInstance: "${instanceName}"\n${message}\nPrevious Version: ${previousVersion}\nNew Version: ${newVersion}`,
			html: `🔄 <b>Application Update:</b><br>Instance: "<i>${instanceName}</i>"<br>${message}<br>Previous Version: <code>${previousVersion}</code><br>New Version: <code>${newVersion}</code>`
		};
		break;
	}
	case "Health": {
		const instanceName = data.instanceName || "Unknown Instance";
		const level = data.level || "Unknown Level";
		const message = data.message || "No health message provided.";
		const type = data.type || "Unknown Type";
		const wikiUrl = data.wikiUrl || "No Wiki URL available.";

		result = {
			version: "v2",
			empty: false,
			plain: `⚠️ **Health Warning:**\nInstance: "${instanceName}"\nLevel: ${level}\nType: ${type}\nMessage: "${message}"\nMore Info: ${wikiUrl}`,
			html: `⚠️ <b>Health Warning:</b><br>Instance: "<i>${instanceName}</i>"<br>Level: ${level}<br>Type: ${type}<br>Message: "<i>${message}</i>"<br>More Info: <a href="${wikiUrl}" target="_blank">${wikiUrl}</a>`
		};
		break;
	}
	case "HealthRestored": {
		const instanceName = data.instanceName || "Unknown Instance";
		const level = data.level || "Unknown Level";
		const message = data.message || "No restoration message provided.";
		const type = data.type || "Unknown Type";
		const wikiUrl = data.wikiUrl || "No Wiki URL available.";

		result = {
			version: "v2",
			empty: false,
			plain: `✅ **Health Restored:**\nInstance: "${instanceName}"\nLevel: ${level}\nType: ${type}\nMessage: "${message}"\nMore Info: ${wikiUrl}`,
			html: `✅ <b>Health Restored:</b><br>Instance: "<i>${instanceName}</i>"<br>Level: ${level}<br>Type: ${type}<br>Message: "<i>${message}</i>"<br>More Info: <a href="${wikiUrl}" target="_blank">${wikiUrl}</a>`
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
