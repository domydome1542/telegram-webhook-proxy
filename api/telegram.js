export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const alertMessage = req.body.message || "No message provided";

  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const telegramRes = await fetch(telegramApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: alertMessage,
        parse_mode: "Markdown",
      }),
    });

    const result = await telegramRes.json();

    if (!result.ok) {
      throw new Error(result.description || "Telegram API error");
    }

    res.status(200).json({ status: "Message sent", telegram: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
