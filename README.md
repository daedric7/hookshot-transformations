# hookshot-transformations
Just a simple storage of js transformations to use with Matrix Hook-shot bot

## Radarr

```
if (data.eventType === \"MovieAdded\") { const ydate = new Date(data.movie.releaseDate) ; result = { plain: `**Movie added** - ${data.movie.title}  ( ${ydate.getFullYear()} ) `, version: \"v2\"}; } else if (data.eventType === \"MovieDelete\") {result = { plain: `**Movie deleted** - ${data.movie.title}`, version: \"v2\"}; } else if (data.eventType === \"Download\") { result = { plain: `**Done** - Movie ${data.movie.title} finished downloading by ${data.downloadClient}`, version: \"v2\"}; } else if (data.eventType === \"Grab\") { result = { plain: `**Dowloading** - Movie ${data.movie.title} being downloaded by ${data.downloadClient}`, version: \"v2\"}; } else { result = {plain: `Unknown event - ${data.eventType}`, version: \"v2\"}; }
```
