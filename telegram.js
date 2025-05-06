export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token, chat_id, text } = req.body;

  if (!token || !chat_id || !text) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const tgRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text }),
    });

    const data = await tgRes.json();
    res.status(200).json({ ok: true, telegramResponse: data });
  } catch (error) {
    res.status(500).json({ message: "Failed to send Telegram message", error });
  }
}
