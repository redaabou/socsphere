// server/src/utils/detectIocType.js

export function detectIocType(value) {
  const input = value.trim();

  const ipv4Pattern =
    /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

  const md5Pattern = /^[a-fA-F0-9]{32}$/;
  const sha1Pattern = /^[a-fA-F0-9]{40}$/;
  const sha256Pattern = /^[a-fA-F0-9]{64}$/;

  const domainPattern =
    /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;

  if (ipv4Pattern.test(input)) return "ip";
  if (md5Pattern.test(input)) return "md5";
  if (sha1Pattern.test(input)) return "sha1";
  if (sha256Pattern.test(input)) return "sha256";
  if (domainPattern.test(input)) return "domain";


  

  return "unknown";
}
