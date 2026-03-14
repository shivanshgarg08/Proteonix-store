export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="section-shell py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-muted">
        <div>
          <p className="font-display text-xl tracking-[0.2em] text-white">PROTEONIX</p>
          <p>Made in India, Made for India</p>
        </div>
        <div className="space-y-2">
          <p>Support: care@proteonix.in</p>
          <p>Ships across India within 3-5 days</p>
        </div>
      </div>
    </footer>
  );
}
