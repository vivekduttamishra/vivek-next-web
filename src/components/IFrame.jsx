

export default function IFrame({
  src,
  title,
  height = 0,
  maxWidth = 792,
  className,
  style,
  allow,
  sandbox,
  referrerPolicy = "no-referrer",
  loading = "lazy",
  scrolling = "no",
  frameBorder = 0,
}) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        ...style,
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          width: "100%",
          height,
          margin: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        loading={loading}
        scrolling={scrolling}
        frameBorder={frameBorder}
        referrerPolicy={referrerPolicy}
        sandbox={sandbox}
        allow={allow}
      />
    </div>
  );
}
