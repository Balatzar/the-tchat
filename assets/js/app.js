// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket";

const channel = socket.channel(
  "tchat:" + document.querySelector("h1").textContent,
  {}
);

channel.on("shout", function(payload) {
  const li = document.createElement("li");
  li.innerHTML = payload.message;
  ul.appendChild(li);
});

channel.join();

const ul = document.getElementById("msg-list");
const msg = document.getElementById("msg");

msg.addEventListener("keypress", function(event) {
  channel.push("shout", {
    message: event.key,
  });
  setTimeout(() => {
    msg.value = "";
  }, 100);
});
