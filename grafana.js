if (data.status == 'firing') {
    result = {plain: `**${data.commonAnnotations.summary}** - ${data.commonAnnotations.description} -- ${data.message}`, version: "v2"};
}
if (data.status == 'resolved') {
    result = {plain: `${data.commonAnnotations.summary} - ${data.commonAnnotations.description} -- ${data.message}`, version: "v2"};
}
