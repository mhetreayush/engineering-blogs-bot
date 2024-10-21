export const isValidHyperlink = (text: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // optional protocol
      "((([a-zA-Z0-9$_.+!*'(),;:&=-])+)(:[a-zA-Z0-9$_.+!*'(),;:&=-]*)?@)?" + // optional username:password@
      '((\\[[0-9a-fA-F:.]+\\])|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))' + // IP address (IPv6 or IPv4) or domain
      '(:\\d+)?' + // optional port
      '(\\/[-a-zA-Z0-9%_.~+]*)*' + // optional path
      '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // optional query
      '(#[-a-zA-Z0-9_]*)?$', // optional fragment
  );

  return urlPattern.test(text);
};
