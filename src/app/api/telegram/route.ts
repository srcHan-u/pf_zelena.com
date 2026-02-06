import { NextResponse } from "next/server";

export const runtime = "edge";

function anySignal(signals: AbortSignal[]): AbortSignal {
  const abortController = new AbortController();
  const onAbort = () => abortController.abort();

  for (const s of signals) {
    if (s.aborted) return s;
    s.addEventListener("abort", onAbort, { once: true });
  }
  abortController.signal.addEventListener("abort", () => signals.forEach((s) => s.removeEventListener("abort", onAbort)), { once: true });

  return abortController.signal;
}

function serverTimeout(ms: number){
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(id),
  };
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME || "localhost";

  // 1) Настраиваем общий сигнал: клиентский abort ИЛИ серверный таймаут
  const { signal: timeoutSignal, clear } = serverTimeout(10000); // 5s SLA
  const combined = anySignal([request.signal, timeoutSignal]);

  try {
    if (combined.aborted) {
      throw new Error("client-aborted-or-timeout");
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const photos = formData.getAll("inspiration").filter(Boolean) as Blob[];

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
    Дата та час отримання заявки: ${new Date().toLocaleString("uk-UA", { timeZone: "America/Edmonton" })}
    Фото референсів (нижче):
    `.trim();

    const sendText = fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: combined,
    });

    const resText = await sendText;
    if (!resText.ok) {
      throw new Error(`telegram-sendMessage-failed: ${resText.status}`);
    }

    for (const photo of photos) {
      if (combined.aborted) throw new Error("aborted-before-photos");
      if (!(photo instanceof Blob) || photo.size === 0) continue;

      const tgForm = new FormData();
      tgForm.append("chat_id", chatId);
      tgForm.append("document", photo, (photo as File).name || "file");

      const resDoc = await fetch(
        `https://api.telegram.org/bot${botToken}/sendDocument`,
        { method: "POST", body: tgForm, signal: combined }
      );

      if (!resDoc.ok) {
        throw new Error(`telegram-sendDocument-failed: ${resDoc.status}`);
      }
    }

    clear();
    return NextResponse.json({ success: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    clear();
    const aborted =
      err?.name === "AbortError" ||
      /aborted|timeout/i.test(String(err?.message));

    const status = aborted ? 499 : 500;
    return NextResponse.json(
      { success: false, error: String(err?.message ?? err) },
      { status }
    );
  }
}
