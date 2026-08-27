import React, { useState, useEffect } from 'react';
import { Upload, Table } from 'lucide-react';
import { datasetsApi } from '../services/api';
import { Dataset } from '../types';

export const DataStudioPage: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Data Engineering & Analytics Studio</h1>
          <p className="text-slate-400 text-sm">Upload, clean, preprocess, and explore datasets</p>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Uploading...' : 'Upload Dataset'}</span>
          <input type="file" onChange={handleFileUpload} accept=".csv,.json,.parquet,.xlsx" className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column: Datasets List */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Your Datasets</h2>
          <div className="space-y-2">
            {datasets.map((ds) => (
              <button
                key={ds.id}
                onClick={() => selectDataset(ds)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selectedDataset?.id === ds.id
                    ? 'bg-indigo-900/40 border-indigo-500/50 text-white'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm truncate">{ds.name}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-800 rounded text-indigo-400">
                    {ds.file_format}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {ds.row_count} rows • {ds.column_count} cols
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Data Preview & Summary */}
        <div className="md:col-span-3 space-y-6">
          {preview && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <Table className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Dataset Data Preview</h3>
                </div>
                <div className="text-xs text-slate-400">Showing top 10 preview rows</div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60">
                      {preview.columns.map((col: string) => (
                        <th key={col} className="p-3 text-slate-300 font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.preview_rows.map((row: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-900/30">
                        {preview.columns.map((col: string) => (
                          <td key={col} className="p-3 text-slate-400">
                            {String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
