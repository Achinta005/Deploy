'use client'
import { useState } from 'react';
import { Heart, Activity, TrendingUp, Plus, ArrowRight,UserSearch } from 'lucide-react';
import Link from 'next/link';

export default function MLModelsHomepage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const models = [
      {
        id: 1,
        name: 'Medical Charges Prediction',
        description: 'Estimate your annual medical charges based on demographic and health information using regression analysis.',
        icon: Activity,
        color: 'from-purple-500 to-indigo-600',
        path: '/medical-charge-prediction',
        stats: '6 Features',
        accuracy: '92% Accuracy'
      },
    {
      id: 2,
      name: 'Heart Disease Predictor',
      description: 'Predict your heart disease risk based on medical metrics and lifestyle factors using advanced machine learning algorithms.',
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      path: '/heart-disease-prediction',
      stats: '19 Features',
      accuracy: '87% Accuracy'
    },
    {
      id: 3,
      name: 'Customer Churn Predictor',
      description: 'Predicts Customer Churn based on Consumer behaviour',
      icon: UserSearch,
      color: 'from-yellow-500 to-pink-600',
      path: '/customer-churn-prediction',
      stats: '19 Features',
      accuracy: '80.35% Accuracy'
    },
  ];

  const emptySlots = Array(4 - models.length).fill(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-16 px-4 md:py-24">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold">
              AI-Powered Predictions
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Machine Learning Models
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my expertise on advanced ML models designed to predict healthcare outcomes and optimize medical decision-making.
          </p>
        </div>

        {/* Models Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Model Cards */}
            {models.map((model) => {
              const IconComponent = model.icon;
              return (
                <Link href={model.path} key={model.id}>
                  <div
                    className="h-full cursor-pointer group"
                    onMouseEnter={() => setHoveredCard(model.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:shadow-2xl">
                      
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`mb-4 p-4 bg-gradient-to-br ${model.color} rounded-xl inline-block`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                          {model.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                          {model.description}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Features</p>
                            <p className="text-lg font-semibold text-white">{model.stats}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Accuracy</p>
                            <p className="text-lg font-semibold text-white">{model.accuracy}</p>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-purple-300 font-semibold text-sm">Explore Model</span>
                          <ArrowRight className={`w-5 h-5 text-purple-300 transition-all duration-300 ${hoveredCard === model.id ? 'translate-x-1' : ''}`} />
                        </div>
                      </div>

                      {/* Border glow effect */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className={`absolute inset-0 bg-gradient-to-r ${model.color} rounded-2xl opacity-20 blur`}></div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Empty Slots for Future Models */}
            {emptySlots.map((_, index) => (
              <div key={`empty-${index}`} className="h-full">
                <div className="relative h-full bg-white/5 backdrop-blur-md border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  
                  {/* Plus Icon */}
                  <div className="p-4 bg-white/10 rounded-xl mb-4 group-hover:bg-white/20 transition-all duration-300">
                    <Plus className="w-8 h-8 text-white/50 group-hover:text-white/70 transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <p className="text-center text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                    Coming Soon
                  </p>
                  <p className="text-center text-gray-500 text-xs mt-2">
                    New model will be added here
                  </p>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-10 blur"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        {/* <div className="max-w-7xl mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Use Our Models</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
                <TrendingUp className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">High Accuracy</h3>
              <p className="text-gray-400">State-of-the-art algorithms trained on extensive datasets for reliable predictions.</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-purple-500/20 rounded-full mb-4">
                <Activity className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Processing</h3>
              <p className="text-gray-400">Get instant predictions with our optimized backend infrastructure.</p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-pink-500/20 rounded-full mb-4">
                <Heart className="w-6 h-6 text-pink-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Healthcare Focused</h3>
              <p className="text-gray-400">Specialized models designed specifically for medical applications and analysis.</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}