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

const submitRoom = document.getElementById("submit-room");

if (submitRoom) {
  submitRoom.addEventListener("submit", function(event) {
    event.preventDefault();
    const roomName = document.getElementById("room-name").value;
    roomName ? location.assign(`/${roomName}`) : null;
  });
}

const roomH1 = document.querySelector(".js-room-name");

if (roomH1) {
  const channel = socket.channel(
    "tchat:" + (roomH1 ? roomH1.textContent : "global"),
    {}
  );

  channel.on("shout", function(payload) {
    const key = payload.message;
    switch (key) {
      case "Enter":
        createLi("");
        break;
      case "Backspace":
        removeChar();
        break;
      default:
        appendKey(key);
        break;
    }
  });
  channel.on("user_joined", function() {
    console.log("join");
  });

  channel.join();

  const ul = document.getElementById("msg-list");
  const msg = document.getElementById("msg");

  msg.addEventListener("keyup", sendKeys);
  msg.addEventListener("keydown", shouldRemoveChar); // allow to remove continuous

  function shouldRemoveChar({ key }) {
    if (key === "Backspace") {
      channel.push("shout", {
        message: key
      });
    }
  }
  function removeChar() {
    const li = ul.lastElementChild;
    li && (li.innerHTML = li.innerHTML.substring(0, li.innerHTML.length - 1));
  }

  function sendKeys({ key }) {
    if (key !== "Backspace") {
      channel.push("shout", {
        message: key === "Enter" ? key : msg.value
      });
      msg.value = "";
    }
  }

  function appendKey(key) {
    const li = ul.lastElementChild;
    li ? appendKeyToLi(li, key) : createLi(key);
  }

  function appendKeyToLi(li, key) {
    li.innerHTML = li.innerHTML + key;
  }

  function createLi(key) {
    const li = document.createElement("li");
    li.innerHTML = key;
    ul.appendChild(li);
  }
}
