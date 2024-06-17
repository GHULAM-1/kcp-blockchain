export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="max-w-[1920px]">{children}</section>;
}
