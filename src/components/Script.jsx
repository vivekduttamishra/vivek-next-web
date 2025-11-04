// Script.tsx
import { useEffect } from "react";



export default function Script({
  src,
  async = true,
  defer = true,
  id,
  onLoad,
  onError,
  attrs = {},
}) {
  useEffect(() => {
    // If script already present, do nothing
    const selector = id ? `script#${id}` : `script[src="${src}"]`;
    let el = document.querySelector(selector) ;
    if (el) return;

    el = document.createElement("script");
    if (id) el.id = id;
    el.src = src;
    el.async = async;
    el.defer = defer;

    if (onLoad) el.addEventListener("load", onLoad);
    if (onError) el.addEventListener("error", onError);

    // Set extra attributes
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));

    document.body.appendChild(el);

    // Do not remove on unmount to avoid reloading for other pages
    return () => {
      if (onLoad) el.removeEventListener("load", onLoad);
      if (onError) el.removeEventListener("error", onError);
    };
  }, [src, async, defer, id, onLoad, onError, attrs]);

  return null;
}
