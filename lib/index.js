import got from "got";
import isUrl from "is-url";
import pkg from "../package.json";

export default function(key, token, idOrUrl) {
  return got(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`, {
    headers: { "User-Agent": `${pkg.name}@${pkg.version}` },
    json: true
  }).then(response => {
    let boards = response.body;
    let board = boards.find(board => board[isUrl(idOrUrl) ? "url" : "id"] === idOrUrl);
    if (!board) throw new Error("Board not found.");
    return board;
  });
}
