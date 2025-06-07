// app/api/telegram/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME || "localhost";

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const photos = formData.getAll("inspiration") as Blob[];

  const text = `
  Нова заявка з сайту ${hostname}:
  Имʼя: ${data.firstName}
  Прізвище: ${data.lastName}
  Email: ${data.email}
  Ідея: ${data.idea}
  Розмір: ${data.size} ${data.sizeUnit}
  Розташування: ${data.placement}
  Телефон: ${data.phone}
  Дата: ${data.date}
  Місто: ${data.whichCity}
  Звідки дізналися: ${data.whereDidYouFindMe}
  Дата та час отримання заявки: ${new Date().toLocaleString("uk-UA", {
    timeZone: "America/Edmonton",
  })}
  Фото референсів (нижче):
  `;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  for (const photo of photos) {
    if (!(photo instanceof Blob) || photo.size === 0) continue;
    const tgForm = new FormData();
    tgForm.append("chat_id", chatId);
    tgForm.append("document", photo, (photo as File).name || "file");

    await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: "POST",
      body: tgForm,
    });
  }

  return NextResponse.json({ success: true });
}
