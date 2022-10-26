import fetch from "node-fetch";
import { verifyKey } from "discord-interactions";

export const verifyDiscordRequest = () => {
  return (req, res, buf, encoding) => {
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");

    const isVerified = verifyKey(timestamp, buf, signature);
    if (!isVerified) {
      res.status(401).send("Bad Request");
      throw new Error("Bad Request");
    }
  };
};

export const discordRequest = async (endpoints, options) => {
  const url =
    "https://1d46-2001-4451-8568-c800-f498-aca8-e16-b931.ap.ngrok.io/";

  if (options.body) options.body = JSON.stringify(options.body);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return res;
};
