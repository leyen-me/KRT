import crypto from "crypto";

// const iv base64
const iv = Buffer.from("Q5XQpDszBgkZPDW/GeUSfw==", "base64")

// Encryption function
export const encrypt = (data, key) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "utf-8"),
    iv
  );
  // Use AES-256-CBC mode
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");
  // Return the encrypted data, including IV and ciphertext
  return {
    data: encrypted,
  };
}

// Decryption function
export const decrypt = (data, key) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "utf-8"),
    iv
  );
  let decrypted = decipher.update(data, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return {
    data: decrypted
  };
}
