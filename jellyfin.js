const obj = JSON.parse(data);

action = String(obj.ItemType)

function fullyDecode(value) {
    try {
        while (typeof value === "string" && value.includes("\\")) {
            value = JSON.parse(`"${value}"`); // Decode any escaped characters
        }
    } catch (error) {
        // If it fails, return as is (it's already clean)
    }
    return value;
}


switch (action) {
    case 'Audio':
	    if (obj.NotificationType === 'PlaybackStart') {
		    result = {
		        "plain": `${obj.NotificationUsername} is playing:\n Title: ${obj.Name}\n Album: ${obj.Album}\n Artist: ${obj.Artist}\n Device: ${obj.DeviceName}\n Quality: ${obj.Audio_0_Title}\n Client: ${obj.ClientName}`,
				"html": `<b>${obj.NotificationUsername}</b> is playing<br><b>Title</b>: ${obj.Name}<br><b>Album</b>: ${obj.Album}<br> <b>Artist</b>: ${obj.Artist}<br> <b>Device</b>: ${obj.DeviceName}<br> <b>Quality</b>: ${obj.Audio_0_Title}<br> <b>Client</b>: ${obj.ClientName}`,
			    version: "v2"
		    };
		} else if (obj.NotificationType === 'ItemAdded') {
			// We don't report individual items
			result = {empty: true, version: "v2"};
		} else {
	        result = {
				plain: `**UNKNOWN** - ${action} -- ${text}`,
				version: "v2"
			};
		}
		break;
	case 'MusicAlbum':
		if (obj.NotificationType === 'ItemAdded') {
			// special chars were being printed as \" or \' instead of " and '
			let ov = fullyDecode(obj.Overview);
		    result = {
		        "plain": `New album added:\n Title: ${obj.Name}\n Overview: ${ov}\n`,
				"html": `New album added:<br><b>Title</b>: ${obj.Name}<br><b>Overview</b>: ${ov}`,
			    version: "v2"
		    };
		}
		break;
	case 'Movie':
		if (obj.NotificationType === 'PlaybackStart') {
		    result = {
		        "plain": `${obj.NotificationUsername} is playing a Movie :\n Title: ${obj.Name}\n  Device: ${obj.DeviceName}\n Quality: ${obj.Video_0_Title}\n Client: ${obj.ClientName} Overview: ${obj.Overview}`,
				"html": `<b>${obj.NotificationUsername}</b> is playing a Movie...<br><b>Title</b>: ${obj.Name}<br><b>Device</b>: ${obj.DeviceName}<br> <b>Quality</b>: ${obj.Video_0_Title}<br> <b>Client</b>: ${obj.ClientName}<br><b>Overview</b>: ${obj.Overview}`,
			    version: "v2"
		    };
		} else {
	        result = {
				plain: `**UNKNOWN** - ${action} -- ${text}`,
				version: "v2"
			};
		}
		break;
	case 'Episode':
		if (obj.NotificationType === 'PlaybackStart') {
		    result = {
		        "plain": `${obj.NotificationUsername} is playing a TVshow :\n Title: ${obj.Name}\n  Device: ${obj.DeviceName}\n Quality: ${obj.Video_0_Title}\n Client: ${obj.ClientName} Overview: ${obj.Overview}`,
				"html": `<b>${obj.NotificationUsername}</b> is playing a TVshow...<br><b>Series</b>: ${obj.SeriesName}<br><b>Title</b>: ${obj.Name}<br><b>Season</b>: ${obj.SeasonNumber}<br><b>Episode</b>: ${obj.EpisodeNumber}<br><b>Device</b>: ${obj.DeviceName}<br> <b>Quality</b>: ${obj.Video_0_Title}<br> <b>Client</b>: ${obj.ClientName}<br><b>Overview</b>: ${obj.Overview}`,
			    version: "v2"
		    };
		} else if (obj.NotificationType === 'ItemAdded') {
			result = {
				"plain": `New episode for ${obj.SeriesName} - S${obj.SeasonNumber00}E{EpisodeNumber00} - ${obj.Video_0_Codec} -- ${obj.Audio_0_Codec}`,
				"html": `New episode for <b>${obj.SeriesName}</b> - S${obj.SeasonNumber00}E{EpisodeNumber00} - ${obj.Video_0_Codec} -- ${obj.Audio_0_Codec}`,
			    version: "v2"
		    };		    
		}else {
	        result = {
				plain: `**UNKNOWN** - ${action} -- ${text}`,
				version: "v2"
			};
		}
		break;
	case 'Season':
		if (obj.NotificationType === 'ItemAdded') {
		    result = {
		        "plain": `New Season for ${obj.SeriesName} - S${obj.SeasonNumber00}. Overview: ${obj.Overview}`,
				"html": `New Season for <b>${obj.SeriesName}</b> - S${obj.SeasonNumber00}. Overview: ${obj.Overview}`,
			    version: "v2"
		    };
		} else {
	        result = {
				plain: `**UNKNOWN** - ${action} -- ${text}`,
				version: "v2"
			};
		}
		break;	
	default:
	     text = Object.keys(obj)
	     result = {
		     plain: `**UNKNOWN** - ${action} -- ${text}`,
			 version: "v2"
		};
	}
