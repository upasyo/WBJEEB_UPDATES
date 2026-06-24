/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col font-sans text-slate-900 overflow-hidden bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Sparkles strokeWidth={2.5} size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">WBJEE Sentry AI</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Autonomous Monitoring System</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
            <span className="text-xs font-semibold uppercase">System Active</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Next Scan In</p>
            <p className="font-mono text-sm font-bold">54:12</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-slate-200 bg-white p-4">
          <nav className="space-y-1">
            <div className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-indigo-700">Dashboard Overview</div>
            <div className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">Notice Archive</div>
            <div className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">PDF Versioning</div>
            <div className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">AI Settings</div>
            <div className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">Notification Logs</div>
          </nav>

          <div className="mt-8 rounded-xl bg-slate-900 p-4 text-white shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GitHub Workflow</p>
            <p className="mt-1 font-mono text-xs text-slate-200">wbjee-monitor.yml</p>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400">Success Rate</span>
              <span className="font-bold text-emerald-400">100%</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-full bg-emerald-500"></div>
            </div>

            <div className="mt-4 text-[10px] text-slate-500">Gemini API: Stable (124/1500)</div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-hidden">
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase text-slate-500">Total Pages Tracked</p>
              <p className="mt-1 text-3xl font-extrabold">14</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase text-slate-500">Critical Alerts (24h)</p>
              <p className="mt-1 text-3xl font-extrabold text-rose-600">02</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase text-slate-500">Last PDF Processed</p>
              <p className="mt-1 text-sm font-semibold truncate">seat_matrix_final_v2.pdf</p>
            </div>
          </div>

          <div className="flex flex-1 gap-6 overflow-hidden">
            <section className="flex w-2/3 flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-3 bg-slate-50/50">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Recent Activity Log</h2>
              </div>
              <div className="flex-1 overflow-auto p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white text-[10px] uppercase text-slate-400">
                    <tr className="border-b border-slate-100">
                      <th className="px-5 py-2">Time</th>
                      <th className="px-5 py-2">Source</th>
                      <th className="px-5 py-2">Action</th>
                      <th className="px-5 py-2">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-medium">
                    <tr className="border-b border-slate-50 bg-rose-50/20">
                      <td className="px-5 py-3 text-slate-400">14:22</td>
                      <td className="px-5 py-3">/counselling</td>
                      <td className="px-5 py-3">Seat Matrix Updated</td>
                      <td className="px-5 py-3"><span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">CRITICAL</span></td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-5 py-3 text-slate-400">12:05</td>
                      <td className="px-5 py-3">/home</td>
                      <td className="px-5 py-3">New Notice PDF</td>
                      <td className="px-5 py-3"><span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">HIGH</span></td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-5 py-3 text-slate-400">11:00</td>
                      <td className="px-5 py-3">/exams</td>
                      <td className="px-5 py-3">Content Drift Check</td>
                      <td className="px-5 py-3"><span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">LOW</span></td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-5 py-3 text-slate-400">09:12</td>
                      <td className="px-5 py-3">/notices</td>
                      <td className="px-5 py-3">Schedule PDF v1.1</td>
                      <td className="px-5 py-3"><span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">MEDIUM</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex w-1/3 flex-col rounded-xl border border-indigo-200 bg-indigo-50 shadow-sm">
              <div className="border-b border-indigo-100 px-5 py-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-700">AI Deep Analysis</h2>
              </div>
              <div className="flex-1 p-5 overflow-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded bg-indigo-600 text-white flex items-center justify-center">
                    <Zap size={12} strokeWidth={3} />
                  </div>
                  <p className="text-xs font-bold">Gemini Flash-1.5</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Summary</p>
                    <p className="text-xs mt-1 leading-relaxed text-slate-700 font-semibold">Critical change detected in Section 4.2 of the Seat Matrix. 45 new seats added to CSE department in JU.</p>
                  </div>

                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Recommended Action</p>
                    <p className="text-xs mt-1 leading-relaxed text-slate-700">Immediate notification sent to user. Prepare for possible shift in cutoff ranks for top institutions.</p>
                  </div>

                  <div className="rounded-lg border-2 border-dashed border-indigo-200 p-3 flex items-center justify-center cursor-pointer hover:bg-indigo-100/50 transition-colors">
                    <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">View Full Comparison Matrix</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-2 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
        <span>Python 3.12 Engine • ntfy.sh active • Local Snapshot v2.44</span>
        <span>GitHub Repository: wbjee-monitor-pro • Last Commit: 14m ago</span>
      </footer>
    </div>
  );
}
