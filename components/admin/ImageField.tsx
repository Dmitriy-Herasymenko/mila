"use client";

import { useRef, useState } from "react";

type Status = "idle" | "uploading" | "error";

export function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleFile(file: File) {
    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("upload_failed");
      const data = (await res.json()) as { url: string };
      onChange(data.url);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mb-4 flex items-center gap-4">
      <div
        className="relative h-20 w-20 shrink-0 overflow-hidden"
        style={{ border: "1px solid var(--color-walnut)", borderRadius: "var(--radius-cards)" }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: "var(--color-midnight-cocoa)" }} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className="btn-ghost text-[13px]"
          style={{ padding: "8px 14px" }}
        >
          {status === "uploading" ? "Завантажую…" : "Завантажити фото"}
        </button>
        {status === "error" && (
          <span className="text-[12px]" style={{ color: "#d1242f" }}>
            Помилка завантаження, спробуй ще раз
          </span>
        )}
      </div>
    </div>
  );
}
