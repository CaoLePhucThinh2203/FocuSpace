import { useEffect } from "react";

/** Tiêu đề và meta description riêng cho từng trang (Lighthouse SEO, cách 2). */
export function useTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
      m.content = description;
    }
  }, [title, description]);
}
