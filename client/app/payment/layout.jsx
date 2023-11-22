export default function PaymentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-primary flex-col">
      <header>
        <h1 className="font-clashDisplay text-3xl font-bold tracking-sm px-28 py-4 bg-white ">
          INVOICEY
        </h1>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
