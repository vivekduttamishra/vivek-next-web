// BeehiivEmbed.tsx
import Script from "./Script";
import IFrame from "./IFrame";



export default function BeehiivEmbed({
  formSrc,
  title = "Subscribe",
  height = 414,
  maxWidth = 792,
}) {
  return (
    <>
      <Script src="https://subscribe-forms.beehiiv.com/embed.js" id="beehiiv-embed-js" />
      <IFrame
        src={formSrc}
        title={title}
        height={height}
        maxWidth={maxWidth}
      />
    </>
  );
}
