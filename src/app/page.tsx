import { ImageCarousel, KidsGiftBoxSection } from '@/app/component';
import { TestimonialSection } from './component/testimonial/Testimonial';
import Footer from './component/footer/Footer';
import { Navigation } from '@/app/components';
import { CAROUSEL_PRODUCT_IMAGES_RESPONSE } from './mocks';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <div className="min-h-screen w-full bg-white relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px, 20px 20px, 20px 20px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        />
        <Navigation />
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <ImageCarousel images={CAROUSEL_PRODUCT_IMAGES_RESPONSE} />
            <KidsGiftBoxSection />
            <TestimonialSection />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}