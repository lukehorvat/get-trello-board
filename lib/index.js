export default function(key, token, idOrUrl) {
  return Promise.resolve({
    id: 1,
    name: "Test",
    key,
    token,
    idOrUrl
  });
}
