import Header from '@/components/shared/header';
import Footer from '@/components/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main id='main-content' className='wrapper flex-1 pb-16 pt-6 sm:pt-8'>{children}</main>
      <Footer />
    </div>
  );
}
