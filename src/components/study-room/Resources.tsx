import React from 'react';

export const Resources = () => {
  const resources = [
    { id: 1, title: 'Calculus Textbook Chapter 12', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Integration Formulas Cheat Sheet', type: 'PDF', size: '1.1 MB' },
    { id: 3, title: 'Practice Problems Set 5', type: 'PDF', size: '856 KB' },
    { id: 4, title: 'Lecture Notes - Week 8', type: 'DOC', size: '1.8 MB' }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#202020] mb-4">Study Resources</h2>
      {resources.map((resource) => (
        <div key={resource.id} className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white p-6 rounded-[20px] border-solid border-[#F0F0F0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#702DFF] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">{resource.type}</span>
              </div>
              <div>
                <h3 className="text-[#202020] text-sm font-bold leading-6">{resource.title}</h3>
                <p className="text-[#7E7E7E] text-xs">{resource.size}</p>
              </div>
            </div>
            <button className="w-[100px] h-[37px] bg-[#702DFF] text-white rounded-xl text-sm font-bold hover:bg-[#5a24cc] transition-colors">
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};