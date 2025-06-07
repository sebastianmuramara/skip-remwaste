import React, { useState } from 'react';
import { ChevronRight, Truck, Calendar, PoundSterling, Shield, CheckCircle, Info, X } from 'lucide-react';

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

  const getSkipDescription = (size: number) => {
    switch (size) {
      case 4: return 'Ideal for small home projects and garden clearances';
      case 6: return 'Perfect for bathroom renovations and small extensions';
      case 8: return 'Great for kitchen renovations and medium projects';
      case 12: return 'Suitable for large home renovations and construction';
      case 16: return 'Perfect for major construction and commercial projects';
      case 20: return 'Ideal for large-scale construction and industrial use';
      default: return 'Perfect for your waste management needs';
    }
  };

  return (
    <div 
      className={`group bg-white rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isSelected 
          ? 'border-blue-500 ring-4 ring-blue-100 shadow-blue-100' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => onSelect(skip.id)}
    >
      {/* Skip Image with Enhanced Visual */}
      <div className="h-52 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 transform rotate-12 scale-150"></div>
        </div>
        
        <div className="text-center relative z-10">
          {/* Enhanced skip representation */}
          <div 
            className={`mx-auto bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-xl shadow-2xl relative transform transition-transform group-hover:scale-110 ${
              skip.size <= 6 ? 'w-24 h-14' : skip.size <= 12 ? 'w-28 h-16' : 'w-32 h-18'
            }`}
          >
            <div className="absolute inset-x-0 bottom-0 h-2 bg-orange-700 rounded-b-xl"></div>
            <div className="absolute top-2 left-2 right-2 h-1 bg-orange-300 rounded"></div>
            <div className="absolute top-4 left-3 right-3 h-0.5 bg-orange-300 rounded"></div>
            {/* Side handles */}
            <div className="absolute -left-1 top-2 w-2 h-4 bg-gray-600 rounded-l"></div>
            <div className="absolute -right-1 top-2 w-2 h-4 bg-gray-600 rounded-r"></div>
          </div>
          <div className={`mx-auto mt-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg shadow-lg ${
            skip.size <= 6 ? 'w-28 h-3' : skip.size <= 12 ? 'w-32 h-3' : 'w-36 h-4'
          }`}></div>
        </div>
        
        {/* Enhanced size badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          {skip.size} Yard
        </div>

        {/* Popular badge for mid-range skips */}
        {(skip.size === 6 || skip.size === 8) && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full font-semibold text-xs shadow-lg">
            Popular
          </div>
        )}
      </div>

      {/* Enhanced Card Content */}
      <div className="p-6">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{skip.size} Yard Skip</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{getSkipDescription(skip.size)}</p>
        </div>

        {/* Enhanced Details with better icons */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-700 bg-blue-50 p-3 rounded-lg">
            <Calendar className="w-5 h-5 mr-3 text-blue-600" />
            <span className="text-sm font-medium">{skip.hire_period_days} day hire period</span>
          </div>
          
          <div className={`flex items-center text-gray-700 p-3 rounded-lg ${
            skip.allowed_on_road ? 'bg-green-50' : 'bg-amber-50'
          }`}>
            <Truck className={`w-5 h-5 mr-3 ${skip.allowed_on_road ? 'text-green-600' : 'text-amber-600'}`} />
            <span className="text-sm font-medium">
              {skip.allowed_on_road ? 'Road placement allowed' : 'Private land placement only'}
            </span>
          </div>

          {skip.allows_heavy_waste && (
            <div className="flex items-center text-gray-700 bg-purple-50 p-3 rounded-lg">
              <Shield className="w-5 h-5 mr-3 text-purple-600" />
              <span className="text-sm font-medium">Heavy waste accepted</span>
            </div>
          )}
        </div>

        {/* Enhanced Pricing */}
        <div className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
          <div className="flex items-baseline gap-2 mb-2">
            <PoundSterling className="w-6 h-6 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">{skip.price_before_vat}</span>
            <span className="text-sm text-gray-500 font-medium">before VAT</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-green-700">
              £{totalPrice} inc. VAT ({skip.vat}%)
            </p>
            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
              All inclusive
            </div>
          </div>
        </div>

        {/* Enhanced Select Button */}
        <button
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
            isSelected
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg'
              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300 hover:border-gray-400'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip.id);
          }}
        >
          {isSelected ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Selected
            </>
          ) : (
            <>
              Select this skip
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function SkipSelection({ selectedSkipId, onSkipSelect }: SkipSelectionProps) {
  const handleCancelSelection = () => {
    if (selectedSkipId) {
      onSkipSelect(selectedSkipId); // This will toggle the selection off
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Enhanced Page Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Perfect Skip</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select the ideal skip size for your project. All prices include delivery, collection, and disposal within our service area.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Info className="w-4 h-4" />
              Free delivery & collection included
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Skip Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skipData.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkipId === skip.id}
              onSelect={onSkipSelect}
            />
          ))}
        </div>

        {/* Add bottom padding when selection is active */}
        {selectedSkipId && <div className="h-48"></div>}
      </div>

      {/* Enhanced Selected Skip Summary - Fixed Bottom Bar */}
      {selectedSkipId && (() => {
        const selectedSkip = skipData.find(skip => skip.id === selectedSkipId);
        if (!selectedSkip) return null;

        const totalPrice = Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100));

        return (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-blue-200 shadow-2xl z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Your Selection</h3>
                    <p className="text-sm text-gray-600">Ready to proceed with your booking</p>
                  </div>
                </div>
                {/* Cancel Button */}
                <button
                  onClick={handleCancelSelection}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                  title="Cancel selection"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  Imagery and information shown throughout this website may not reflect the exact shape or size specification,
                  colours may vary, options and/or accessories may be featured at additional cost.
                </p>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-lg relative">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-orange-700 rounded-b-lg"></div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedSkip.size} Yard Skip
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedSkip.hire_period_days} day hire period
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">£{totalPrice}</p>
                  <p className="text-sm text-gray-500 font-medium">inc. VAT</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-semibold rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back
                  </button>
                  <button
                    onClick={handleCancelSelection}
                    className="px-6 py-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 font-semibold rounded-xl hover:from-red-200 hover:to-red-300 transition-all duration-200 flex items-center justify-center gap-2 border border-red-300"
                  >
                    <X className="w-4 h-4" />
                    Cancel Selection
                  </button>
                </div>
                <button
                  onClick={() => window.location.href = '/next-page'}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  Continue to Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}