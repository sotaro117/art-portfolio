import "../../global.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "app/components/admin/sidenav";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className='antialiased flex h-screen flex-col md:flex-row md:overflow-hidden '>
        <div className='w-full flex-none md:w-64'>
          <Navbar />
        </div>
        <div className='md:w-4xl md:m-20 m-7'>{children}</div>
      </body>
    </html>
  );
}
