"use client";

import ReactDOM from "react-dom";

// Open the connection to the media CDN while the HTML is still loading
export default function PreloadResources() {
  ReactDOM.preconnect("https://cdn.sanity.io");
  return null;
}
