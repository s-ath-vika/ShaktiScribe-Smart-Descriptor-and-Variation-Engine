import Hero from '../components/Hero';
import Card from '../components/Card';

export default function Home() {
  // Sample local mock data 
  const sampleProducts = [
    {
      id: 1,
      title: "Himalayan Finger Millet Snacks",
      description: "Crispy, nutritious snacks crafted from organically grown ragi in the high mountain valleys of Uttarakhand.",
      tag: "Health-Focused"
    },
    {
      id: 2,
      title: "Pure Rhododendron Juice",
      description: "Naturally extracted wild Buransh blossoms pressed carefully into a refreshing, premium wellness beverage.",
      tag: "Premium"
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-slate-8xl text-center md:text-left">
            Explore Core Enterprise Collections
          </h2>
          <p className="text-slate-600 max-w-2xl text-center md:text-left">
            Select an active regional retail product line below to view ingredients and configure targeted marketing contexts.
          </p>
        </div>
        
        {/* Responsive Grid display showcasing reusable cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleProducts.map(product => (
            <Card 
              key={product.id}
              title={product.title}
              description={product.description}
              tag={product.tag}
            />
          ))}
        </div>
      </main>
    </div>
  );
}