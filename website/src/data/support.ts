// ─────────────────────────────────────────────────────────────
// Donation / payment configuration.
// Replace the placeholder values below with your real details
// before going live — QR codes are generated from these strings.
// ─────────────────────────────────────────────────────────────

export const supportConfig = {
  /**
   * Zelle: enter the email or US phone number enrolled with Zelle.
   * The QR encodes the standard Zelle payment payload that banking
   * apps recognize when scanned.
   */
  zelle: {
    enabled: true,
    recipient: 'pay@robotbod.ai', // ← replace with your Zelle email/phone
    displayName: 'ProjectX · Emergence',
  },

  /**
   * Crypto wallets — native for the next generation of readers.
   * QR codes use the standard URI scheme each wallet app expects.
   */
  crypto: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      address: 'bc1q-REPLACE-WITH-YOUR-BTC-ADDRESS',
      uriPrefix: 'bitcoin:',
      color: '#f7931a',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0xREPLACE-WITH-YOUR-ETH-ADDRESS',
      uriPrefix: 'ethereum:',
      color: '#627eea',
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      address: 'REPLACE-WITH-YOUR-SOL-ADDRESS',
      uriPrefix: 'solana:',
      color: '#14f195',
    },
  ],
};

export function zelleQrPayload(): string {
  const data = btoa(
    JSON.stringify({
      token: supportConfig.zelle.recipient,
      name: supportConfig.zelle.displayName,
    }),
  );
  return `https://enroll.zellepay.com/qr-codes?data=${data}`;
}
