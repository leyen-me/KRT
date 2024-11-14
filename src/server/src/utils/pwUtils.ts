import crypto from "crypto";

// Encryption function
export function encrypt(text, key) {
  const iv = crypto.randomBytes(16); // Initialize the initialization vector (IV), 16 bytes in length
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "utf-8"),
    iv
  ); // Use AES-256-CBC mode
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  // Return the encrypted data, including IV and ciphertext
  return {
    iv: iv.toString("base64"),
    encryptedData: encrypted,
  };
}

// Decryption function
export function decrypt(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "utf-8"),
    Buffer.from(iv, "base64")
  );
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}