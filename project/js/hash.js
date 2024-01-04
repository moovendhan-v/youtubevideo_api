function generateHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  return crypto.subtle.digest('SHA-256', data)
    .then(hashBuffer => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}

function generateUniqueHash(input) {
  const uniqueInput = input + Math.random().toString();
  return generateHash(uniqueInput);
}
