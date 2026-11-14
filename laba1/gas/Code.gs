function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonOk_(data) {
  return json_({ ok: true, data, error: null });
}

function jsonError_(code, message) {
  return json_({ ok: false, data: null, error: { code, message } });
}

function listTrafficLights_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("DB_SPREADSHEET_ID");
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("TRAFFIC_LIGHTS");
  const data = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < data.length; i++) { // Пропускаємо заголовок
    result.push({ id: data[i][0], currentSignal: data[i][1] });
  }
  return result;
}

function doGet(e) {
  try {
    const action = e?.parameter?.action;
    if (action !== "list") return jsonError_("unknown_action", "Unsupported action");
    return jsonOk_({ trafficLights: listTrafficLights_() });
  } catch (error) {
    return jsonError_("storage_error", error.message);
  }
}

function doPost(e) {
  try {
    const command = JSON.parse(e?.postData?.contents || "{}");
    if (command.action !== "updateState") return jsonError_("unknown_action", "Unsupported action");
    if (!["red", "yellow", "green"].includes(command.currentSignal)) return jsonError_("invalid_signal", "Unsupported signal");
    
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty("DB_SPREADSHEET_ID");
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("TRAFFIC_LIGHTS");
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === command.id) {
        sheet.getRange(i + 1, 2).setValue(command.currentSignal);
        return jsonOk_({ trafficLight: { id: command.id, currentSignal: command.currentSignal } });
      }
    }
    return jsonError_("not_found", "Record not found");
  } catch (error) {
    return jsonError_("bad_request", error.message);
  }
}
