// utils/cleanText.js
export function cleanText(raw = "") {
  if (!raw) return "";

  // ลบ HTML tags
  let text = raw.replace(/<[^>]+>/g, "");

  // แปลง HTML entities พื้นฐาน
  const entities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#8211;": "–",
    "&#8212;": "—",
    "&#8230;": "…",
    "&#8220;": "“",
    "&#8221;": "”",
    "&#8242;": "′",
    "&#8243;": "″",
  };

  return text.replace(/&[a-zA-Z0-9#]+;/g, (match) => entities[match] || match);
}
