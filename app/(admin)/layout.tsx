export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages get their own shell — no public header/footer/banner
  return <>{children}</>;
}
