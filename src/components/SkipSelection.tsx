import React, { useState } from 'react';
import { ChevronRight, Truck, Calendar, PoundSterling } from 'lucide-react';

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

const skipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    price_before_vat: 278,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    price_before_vat: 325,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 385,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: true
  },
  {
    id: 17936,
    size: 12,
    hire_period_days: 14,
    price_before_vat: 450,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: true
  },
  {
    id: 17937,
    size: 16,
    hire_period_days: 14,
    price_before_vat: 520,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: true
  },
  {
    id: 17938,
    size: 20,
    hire_period_days: 14,
    price_before_vat: 595,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: true
  }
];

interface SkipSelectionProps {
  selectedSkipId: number | null;
  onSkipSelect: (id: number) => void;
}

function SkipCard({ skip, isSelected, onSelect }: { 
  skip: Skip; 
  isSelected: boolean; 
  onSelect: (id: number) => void; 
}) {
  const totalPrice = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(skip.id)}
    >
      {/* Skip Image */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          {/* Simple skip representation */}
          <div 
            className={`mx-auto bg-orange-500 rounded-t-lg shadow-lg relative ${
              skip.size <= 6 ? 'w-20 h-12' : skip.size <= 12 ? 'w-24 h-14' : 'w-28 h-16'
            }`}
          >
            <div className="absolute inset-x-0 bottom-0 h-1 bg-orange-600 rounded-b-lg"></div>
            <div className="absolute top-1 left-1 right-1 h-1 bg-orange-400 rounded"></div>
          </div>
          <div className={`mx-auto mt-1 bg-gray-600 rounded ${
            skip.size <= 6 ? 'w-24 h-2' : skip.size <= 12 ? 'w-28 h-2' : 'w-32 h-3'
          }`}></div>
        </div>
        
        {/* Size badge */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
          {skip.size} Yard
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{skip.size} Yard Skip</h3>
          <p className="text-gray-600 text-sm">Perfect for medium-sized projects and home clearances</p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{skip.hire_period_days} day hire period</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Truck className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm">
              {skip.allowed_on_road ? 'Road placement allowed' : 'Private land only'}
            </span>
          </div>

          {skip.allows_heavy_waste && (
            <div className="flex items-center text-gray-700">
              <div className="w-4 h-4 mr-2 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm">Heavy waste accepted</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-1">
            <PoundSterling className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{skip.price_before_vat}</span>
            <span className="text-sm text-gray-500">before VAT</span>
          </div>
          <p className="text-sm text-gray-600">
            £{totalPrice} inc. VAT ({skip.vat}%)
          </p>
        </div>

        {/* Select Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip.id);
          }}
        >
          {isSelected ? 'Selected' : 'Select this skip'}
          <ChevronRight className={`w-4 h-4 transition-transform ${
            isSelected ? 'rotate-90' : ''
          }`} />
        </button>
      </div>
    </div>
  );
}

export default function SkipSelection({ selectedSkipId, onSkipSelect }: SkipSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Skip Size</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the perfect skip for your waste management needs. All prices include delivery and collection within our service area.
            </p>
          </div>
        </div>
      </div>

      {/* Skip Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skipData.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkipId === skip.id}
              onSelect={onSkipSelect}
            />
          ))}
        </div>

        {/* Selected Skip Summary */}
        {selectedSkipId && (
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Selection</h3>
            {(() => {
              const selectedSkip = skipData.find(skip => skip.id === selectedSkipId);
              if (!selectedSkip) return null;
              
              const totalPrice = Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100));
              
              return (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedSkip.size} Yard Skip
                    </p>
                    <p className="text-gray-600">
                      {selectedSkip.hire_period_days} day hire period
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">£{totalPrice}</p>
                    <p className="text-sm text-gray-500">inc. VAT</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}