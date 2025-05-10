// Bazarr supports generic webhooks, you must choose the type JSON and then add something like this in the text box:
// jsons://hookshot.matrix.org/rest-of-the-url

if (data.message.includes("subtitles downloaded")) {
	// Subtitle downloaded notification
	result = {
		version: "v2",
		empty: false,
		plain: `🎉 **Subtitle Downloaded:**\n${data.message}`,
		html: `🎉 <b>Subtitle Downloaded:</b><br>${data.message}`
	};
} else if (data.message === "Test notification") {
	// Test notification
	result = {
		version: "v2",
		empty: false,
		plain: `✅ **${data.title}:**\n${data.message}`,
		html: `✅ <b>${data.title}:</b><br>${data.message}`
	};
} else {
	// Unknown notification
	result = {
		version: "v2",
		empty: false,
		plain: `ℹ️ **Bazarr Notification:**\n${data.message}`,
		html: `ℹ️ <b>Bazarr Notification:</b><br>${data.message}`
	};
}
