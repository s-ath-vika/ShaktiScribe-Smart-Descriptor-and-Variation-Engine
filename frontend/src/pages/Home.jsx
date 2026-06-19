import Hero from '../components/Hero';
import Card from '../components/Card';

export default function Home() {
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
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 dark:bg-slate-900 dark:border-slate-800">
          
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white text-center md:text-left">
              Explore Core Enterprise Collections
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
              Select an active regional retail product line below to view ingredients and configure targeted marketing contexts.
            </p>
          </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleProducts.map(product => (
              <Card 
                key={product.id}
                title={product.title}
                description={product.description}
                tag={product.tag}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}