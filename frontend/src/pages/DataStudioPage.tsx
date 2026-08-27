import React, { useState, useEffect } from 'react';
import { Upload, Table, FileText, Search, Plus, Filter, CheckCircle2, ChevronRight } from 'lucide-react';
import { datasetsApi } from '../services/api';
import { Dataset } from '../types';

export const DataStudioPage: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = () => {
    datasetsApi.list().then((res) => {
      setDatasets(res.data);
      if (res.data.length > 0) {
        selectDataset(res.data[0]);
      }
    });
  };

  const selectDataset = (ds: Dataset) => {
    setSelectedDataset(ds);
    datasetsApi.preview(ds.id).then((res) => setPreview(res.data));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    datasetsApi
      .upload(e.target.files[0])
      .then(() => {
        setIsUploading(false);
        loadDatasets();
      })
      .catch(() => setIsUploading(false));
  };

  const filteredDatasets = datasets.filter((ds) =>
    ds.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Data Engineering & Analytics Studio</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Upload, clean, preprocess, and inspect dataset schema properties</p>
        </div>

        {/* Upload Button */}
        <label className="btn-indigo flex items-center justify-center space-x-2 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span className="text-xs font-bold">{isUploading ? 'Ingesting File...' : 'Upload New Dataset'}</span>
          <input type="file" onChange={handleFileUpload} accept=".csv,.json,.parquet,.xlsx" className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Datasets Sidebar List (4 Columns on Desktop) */}
        <div className="lg:col-span-4 card-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dataset Registry</h2>
            <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {datasets.length} Total
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 text-xs"
            />
          </div>

          {/* List of Dataset Items */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredDatasets.map((ds) => {
              const isSelected = selectedDataset?.id === ds.id;
              return (
                <button
                  key={ds.id}
                  onClick={() => selectDataset(ds)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500/60 text-white shadow-md shadow-indigo-600/10'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-white truncate max-w-[180px]">{ds.name}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-800 text-indigo-300 rounded border border-slate-700">
                      {ds.file_format}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{ds.row_count} rows • {ds.column_count} cols</span>
                    <span>{(ds.file_size_bytes / 1024).toFixed(1)} KB</span>
                  </div>
                </button>
              );
            })}

            {filteredDatasets.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-xs">
                No matching datasets found
              </div>
            )}
          </div>
        </div>

        {/* Data Preview & Schema Inspector (8 Columns on Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {preview ? (
            <div className="card-panel p-6 space-y-6">
              
              {/* Preview Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                    <Table className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{preview.name}</h3>
                    <p className="text-xs text-slate-400">Displaying top 10 records preview</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-medium text-slate-400">
                  <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">{preview.row_count} Total Rows</span>
                  <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">{preview.column_count} Columns</span>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                      {preview.columns.map((col: string) => (
                        <th key={col} className="p-3.5 font-bold whitespace-nowrap">
                          {col}
                          <span className="block text-[9px] font-normal text-slate-400 uppercase mt-0.5">
                            {preview.dtypes[col]}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {preview.preview_rows.map((row: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        {preview.columns.map((col: string) => (
                          <td key={col} className="p-3.5 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                            {String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            <div className="card-panel p-12 text-center text-slate-500 space-y-3">
              <FileText className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-medium">Select a dataset from the registry to inspect schema preview</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
