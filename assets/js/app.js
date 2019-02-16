import css from "../css/app.css";
import "phoenix_html";
import $ from "jquery";
import socket from "./socket"
import phrases_init from "./phrases_with_phriends";

function start() {
  let root = document.getElementById('root');
  if (root) {
    let channel = socket.channel("games:" + window.gameName, {});
    // We want to join in the react component.
    phrases_init(root, channel);
  }
}

$(start);
