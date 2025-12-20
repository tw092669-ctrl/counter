import React, { useState, useMemo } from 'react';
import { LogEntry } from '../types';
import { Calendar, Search, X } from 'lucide-react';

interface HistoryViewProps {
  logs: LogEntry[];
  onClose: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ logs, onClose }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Sort logs by date descending
  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [logs]);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return sortedLogs.filter(log => {
      const logDate = new Date(log.timestamp).setHours(0,0,0,0);
      let isValid = true;
      if (startDate) {
        isValid = isValid && logDate >= new Date(startDate).setHours(0,0,0,0);
      }
      if (endDate) {
        isValid = isValid && logDate <= new Date(endDate).setHours(0,0,0,0);
      }
      return isValid;
    });
  }, [sortedLogs, startDate, endDate]);

  const totalInPeriod = filteredLogs.reduce((acc, log) => acc + log.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-stone-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Calendar className="text-amber-500" />
            <h2 className="text-xl font-bold">念經紀錄檢視</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">開始日期</label>
            <input 
              type="date" 
              className="w-full p-2 rounded border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">結束日期</label>
            <input 
              type="date" 
              className="w-full p-2 rounded border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="bg-amber-100 p-2 rounded border border-amber-200 flex flex-col justify-center items-center">
             <span className="text-xs text-amber-800 font-bold uppercase">區間總數</span>
             <span className="text-2xl font-bold text-amber-600">{totalInPeriod.toLocaleString()}</span>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-stone-500 text-sm border-b border-stone-200">
                <th className="p-3 font-semibold">日期時間</th>
                <th className="p-3 font-semibold">項目</th>
                <th className="p-3 font-semibold text-right">數量</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-stone-400">
                    無紀錄
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => {
                  const date = new Date(log.timestamp);
                  return (
                    <tr key={log.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                      <td className="p-3 text-stone-600">
                        <div className="font-medium text-stone-800">
                          {date.toLocaleDateString()}
                        </div>
                        <div className="text-xs text-stone-400">
                          {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </td>
                      <td className="p-3 font-medium text-stone-700">{log.mantraName}</td>
                      <td className="p-3 text-right font-bold text-amber-600">+{log.amount}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};