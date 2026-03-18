import Header from '@/components/Header';
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}
