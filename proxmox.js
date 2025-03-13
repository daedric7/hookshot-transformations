//by Mephisto @mephisto:mephis.to

if (data.severity=="unknown") {
  color='#797979'
} else if (data.severity=="info") {
  color='#99cc0e'
} else if (data.severity=="error"){
  color='#ff0000'
}
msg = data.message.replace  
result = {
      msgtype: "m.text",
      plain: `PLAIN **PVE** Host ${data.fields.hostname}\ 
      ####
      test`,
      html: `
      <b>PVE</b> ${data.fields.hostname}<br />
      Severity: <font color="${color}">${data.severity}</font><br />
      Type: ${data.fields.type}<br />
      Message:<br /> ${data.message.replace(/(?:\r\n|\r|\n)/g, '<br>')}
      `,
      version: "v2"
}
