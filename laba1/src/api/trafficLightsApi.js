// src/api/trafficLightsApi.js

const API_URL = "https://script.google.com/macros/s/AKfycbwP5QgMZU5a_INltE3OTQCmh8mrbJ_OBicYgqdHMAvjWBk0OKtQ5quyKf9eY6x_wYe6/exec"; 

async function parseEnvelope(response) {
  const payload = await response.json();
  if (!payload.ok) {
    throw new Error(payload.error?.message || "GAS request failed");
  }
  return payload.data;
}

export async function listTrafficLights() {
  const response = await fetch(`${API_URL}?action=list`);
  const data = await parseEnvelope(response);
  return data.trafficLights;
}

export async function updateTrafficLightState(id, currentSignal) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "updateState",
      id,
      currentSignal,
    }),
  });
  const data = await parseEnvelope(response);
  return data.trafficLight;
}