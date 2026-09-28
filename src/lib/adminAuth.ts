import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "sunnahlife_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "sunnahlife_secure_salt_key_987654321";

// Rate limiting in-memory map
interface AttemptInfo {
  count: number;
  firstAttemptTime: number;
}
const attemptsMap = new Map<string, AttemptInfo>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(ip: string): { allowed: boolean; waitMinutes?: number } {
  const now = Date.now();
  const record = attemptsMap.get(ip);

  if (!record) {
    return { allowed: true };
  }

  if (now - record.firstAttemptTime > LOCKOUT_WINDOW_MS) {
    attemptsMap.delete(ip);
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const remainingTime = Math.ceil((LOCKOUT_WINDOW_MS - (now - record.firstAttemptTime)) / 60000);
    return { allowed: false, waitMinutes: remainingTime };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const record = attemptsMap.get(ip);
  if (!record || now - record.firstAttemptTime > LOCKOUT_WINDOW_MS) {
    attemptsMap.set(ip, { count: 1, firstAttemptTime: now });
  } else {
    record.count += 1;
  }
}

export function clearAttempts(ip: string) {
  attemptsMap.delete(ip);
}

// Generate HMAC signed token
export function createSessionToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: crypto.randomBytes(16).toString("hex"),
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

// Verify HMAC signed token
export function verifySessionToken(token: string | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [data, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("base64url");

  // Constant-time comparison
  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (payload.role !== "admin" || !payload.exp || Date.now() > payload.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Verify given passcode against server env variable or secure default
export function verifyAdminPasscode(inputPasscode: string): boolean {
  if (!inputPasscode || typeof inputPasscode !== "string") return false;

  const configuredPins: string[] = [];
  if (process.env.ADMIN_PIN) configuredPins.push(process.env.ADMIN_PIN.trim());
  if (process.env.ADMIN_PASSCODE) configuredPins.push(process.env.ADMIN_PASSCODE.trim());

  // Default allowed passcodes if no env var is configured
  if (configuredPins.length === 0) {
    configuredPins.push("7860");
  }

  for (const pin of configuredPins) {
    const a = Buffer.from(inputPasscode);
    const b = Buffer.from(pin);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      return true;
    }
  }

  return false;
}

export { SESSION_COOKIE_NAME };
