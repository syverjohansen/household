import { useState, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MONTHS, CATEGORY_CONFIG, getSeasonForMonth, type Category, type Month } from './data/maintenanceTasks';
import { MONTH_NAMES, WEEKLY_TASKS, MONTHLY_ZONES, DEEP_CLEAN_MONTHS } from './data/cleaningTasks';
import './App.css';

type TabType = 'maintenance' | 'cleaning';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('maintenance');
  const [checkedTasks, setCheckedTasks] = useLocalStorage<Record<string, boolean>>('homeowner-checklist-tasks', {});
  const [cleaningChecks, setCleaningChecks] = useLocalStorage<Record<string, boolean>>('homeowner-cleaning-tasks', {});
  const [openMonths, setOpenMonths] = useState<Set<number>>(() => {
    const currentMonth = new Date().getMonth() + 1;
    return new Set([currentMonth]);
  });
  const [activeCleanMonth, setActiveCleanMonth] = useState(() => new Date().getMonth() + 1);

  // Toggle task checked state
  const toggleTask = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Toggle cleaning task
  const toggleCleaningTask = (key: string) => {
    setCleaningChecks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle month open/closed
  const toggleMonth = (monthNumber: number) => {
    setOpenMonths(prev => {
      const next = new Set(prev);
      if (next.has(monthNumber)) {
        next.delete(monthNumber);
      } else {
        next.add(monthNumber);
      }
      return next;
    });
  };

  // Calculate total tasks and completed
  const { totalTasks, progressPercent } = useMemo(() => {
    let total = 0;
    let completed = 0;

    MONTHS.forEach(month => {
      month.groups.forEach(group => {
        group.tasks.forEach(task => {
          total++;
          if (checkedTasks[task.id]) completed++;
        });
      });
    });

    return {
      totalTasks: total,
      progressPercent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [checkedTasks]);

  // Calculate cleaning progress for active month
  const cleaningProgress = useMemo(() => {
    const m = activeCleanMonth;
    let total = WEEKLY_TASKS.length * 4; // 4 weeks
    let done = 0;

    // Weekly tasks
    for (let w = 1; w <= 4; w++) {
      WEEKLY_TASKS.forEach((_, ti) => {
        if (cleaningChecks[`${m}_w${w}_${ti}`]) done++;
      });
    }

    // Monthly tasks
    MONTHLY_ZONES.forEach((zone, zi) => {
      zone.tasks.forEach((_, ti) => {
        total++;
        if (cleaningChecks[`${m}_monthly_mz${zi}_${ti}`]) done++;
      });
    });

    return {
      total,
      done,
      percent: total > 0 ? Math.round((done / total) * 100) : 0
    };
  }, [activeCleanMonth, cleaningChecks]);

  // Render a category pill
  const renderPill = (category: Category) => {
    const config = CATEGORY_CONFIG[category];
    return (
      <span key={category} className={`pill ${category}`}>
        {config.emoji} {config.label}
      </span>
    );
  };

  // Group months by season for display
  const renderMaintenanceContent = () => {
    let lastSeason: string | null = null;
    const elements: ReactNode[] = [];

    // Display order: Jan-Dec (so we show winter first in Jan)
    const displayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    displayOrder.forEach(monthNum => {
      const month = MONTHS.find(m => m.number === monthNum);
      if (!month) return;

      const season = getSeasonForMonth(monthNum);

      // Add season header if new season
      if (season && season.name !== lastSeason) {
        // Special case: December goes with winter at start
        if (monthNum === 1 || (monthNum === 3) || (monthNum === 6) || (monthNum === 9)) {
          elements.push(
            <div key={`season-${season.name}`} className="season-header">
              <div className={`season-icon ${season.iconClass}`}>{season.icon}</div>
              <div>
                <div className="season-range">{season.range}</div>
                <div className="season-title">{season.name}</div>
              </div>
            </div>
          );
          lastSeason = season.name;
        }
      }

      elements.push(renderMonthCard(month));
    });

    return elements;
  };

  const renderMonthCard = (month: Month) => {
    const isOpen = openMonths.has(month.number);

    // Count completed tasks in this month
    let monthTotal = 0;
    let monthCompleted = 0;
    month.groups.forEach(group => {
      group.tasks.forEach(task => {
        monthTotal++;
        if (checkedTasks[task.id]) monthCompleted++;
      });
    });

    return (
      <div key={month.number} className={`month-card ${isOpen ? 'open' : ''}`}>
        <div className="month-head" onClick={() => toggleMonth(month.number)}>
          <div className="month-num">{String(month.number).padStart(2, '0')}</div>
          <div className="month-name-wrap">
            <div className="month-name">{month.name}</div>
            <div className="month-tagline">{month.tagline}</div>
          </div>
          <span className="month-count">{monthCompleted}/{monthTotal} tasks</span>
          <span className="chevron">▾</span>
        </div>
        <div className="task-body">
          {month.deepClean && (
            <div className="deep-clean-banner">
              <div className="deep-clean-icon">🫧</div>
              <div>
                <div className="deep-clean-title">{month.deepClean.title}</div>
                <div className="deep-clean-body">{month.deepClean.body}</div>
              </div>
            </div>
          )}
          {month.groups.map((group, gi) => (
            <div key={gi} className="task-group">
              <div className="task-group-label">{group.label}</div>
              {group.tasks.map((task, ti) => {
                const isChecked = checkedTasks[task.id] || false;
                return (
                  <div key={ti} className="task-item">
                    <div
                      className={`task-check ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      {isChecked ? '✓' : ''}
                    </div>
                    <div className="task-text">
                      <div className={`task-main ${isChecked ? 'checked-text' : ''}`}>
                        {task.text}
                      </div>
                      {task.note && <div className="task-note">{task.note}</div>}
                      <div className="task-pills">
                        {task.categories.map(cat => renderPill(cat))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCleaningContent = () => {
    const deepClean = DEEP_CLEAN_MONTHS[activeCleanMonth];

    return (
      <div className="clean-main">
        {/* Month selector */}
        <div className="clean-month-nav">
          {MONTH_NAMES.map((name, i) => {
            const m = i + 1;
            return (
              <button
                key={m}
                className={`cmn-btn ${m === activeCleanMonth ? 'active' : ''}`}
                onClick={() => setActiveCleanMonth(m)}
              >
                {name.slice(0, 3)}
              </button>
            );
          })}
        </div>

        {/* Month progress */}
        <div className="month-progress-row">
          <span className="mp-label">This month's cleaning</span>
          <div className="mp-bar-bg">
            <div className="mp-bar-fill" style={{ width: `${cleaningProgress.percent}%` }} />
          </div>
          <span className="mp-pct">{cleaningProgress.percent}%</span>
        </div>

        {/* Deep clean reminder */}
        {deepClean && (
          <div className="deep-remind">
            <div className="deep-remind-icon">🫧</div>
            <div>
              <div className="deep-remind-title">{deepClean.label} — This Month</div>
              <div className="deep-remind-body">
                <strong>Hire a cleaning service:</strong> {deepClean.note}
              </div>
            </div>
          </div>
        )}

        {/* Weekly tasks */}
        <div className="clean-section-title">Weekly Tasks</div>
        <div className="clean-section-sub">Track each of the 4 weeks this month. Check off as you go.</div>
        <div className="week-grid">
          {[1, 2, 3, 4].map(week => {
            const weekDone = WEEKLY_TASKS.filter((_, ti) =>
              cleaningChecks[`${activeCleanMonth}_w${week}_${ti}`]
            ).length;

            return (
              <div key={week} className="week-col">
                <div className="week-col-head">
                  Week {week}
                  <span className="week-done-badge">{weekDone}/{WEEKLY_TASKS.length}</span>
                </div>
                <div className="week-col-body">
                  {WEEKLY_TASKS.map((task, ti) => {
                    const key = `${activeCleanMonth}_w${week}_${ti}`;
                    const isChecked = cleaningChecks[key] || false;
                    return (
                      <div key={ti} className="ct-item">
                        <div
                          className={`ct-check ${isChecked ? 'checked' : ''}`}
                          onClick={() => toggleCleaningTask(key)}
                        >
                          {isChecked ? '✓' : ''}
                        </div>
                        <div className={`ct-label ${isChecked ? 'done' : ''}`}>{task}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Monthly tasks */}
        <div className="monthly-clean-card">
          <div className="mcc-head">
            <div>
              <div className="mcc-title">Monthly Tasks</div>
              <div className="mcc-subtitle">Do once this month — pick your timing</div>
            </div>
            <span className="mcc-done-badge">
              {MONTHLY_ZONES.reduce((acc, zone, zi) =>
                acc + zone.tasks.filter((_, ti) =>
                  cleaningChecks[`${activeCleanMonth}_monthly_mz${zi}_${ti}`]
                ).length, 0
              )} / {MONTHLY_ZONES.reduce((acc, zone) => acc + zone.tasks.length, 0)}
            </span>
          </div>
          <div className="monthly-grid">
            {MONTHLY_ZONES.map((zone, zi) => (
              <div key={zi} className="monthly-zone">
                <div className="monthly-zone-label">{zone.emoji} {zone.label}</div>
                {zone.tasks.map((task, ti) => {
                  const key = `${activeCleanMonth}_monthly_mz${zi}_${ti}`;
                  const isChecked = cleaningChecks[key] || false;
                  return (
                    <div key={ti} className="ct-item">
                      <div
                        className={`ct-check ${isChecked ? 'checked' : ''}`}
                        onClick={() => toggleCleaningTask(key)}
                      >
                        {isChecked ? '✓' : ''}
                      </div>
                      <div className={`ct-label ${isChecked ? 'done' : ''}`}>{task}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">Washington DC · Lot 104 · 5th Street NW</div>
        <h1>5811 — Your Year in <em>Home</em></h1>
        <p className="hero-sub">
          A month-by-month maintenance checklist tailored to your 2½-story rowhouse,
          finished basement, forced-air system, deck, front porch, concrete driveway, and DC's climate.
        </p>
        <div className="hero-tags">
          <div className="hero-tag"><span>🏠</span> 2½ Story + Basement</div>
          <div className="hero-tag"><span>💨</span> Forced Air HVAC</div>
          <div className="hero-tag"><span>🪵</span> Deck + Front Porch</div>
          <div className="hero-tag"><span>🚗</span> Concrete Driveway</div>
          <div className="hero-tag"><span>🌿</span> DIY Yard Care</div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          🏠 Monthly Maintenance
        </button>
        <button
          className={`tab-btn ${activeTab === 'cleaning' ? 'active' : ''}`}
          onClick={() => setActiveTab('cleaning')}
        >
          🧹 Cleaning Tracker
        </button>
      </div>

      {/* Maintenance Tab */}
      <div className={`tab-panel ${activeTab === 'maintenance' ? 'active' : ''}`}>
        {/* Legend */}
        <div className="legend-bar">
          <span className="legend-label">Categories:</span>
          <span className="pill hvac">🌡 HVAC</span>
          <span className="pill clean">🧹 Cleaning</span>
          <span className="pill outdoor">🌿 Outdoor</span>
          <span className="pill safety">🔒 Safety</span>
          <span className="pill struct">🔧 Structural</span>
          <span className="pill deep">🫧 Deep Clean</span>
          <span className="pill admin">📋 Admin</span>
        </div>

        <div className="main">
          {/* Annual Snapshot */}
          <div className="snapshot">
            <h2>At a Glance — What to Expect This Year</h2>
            <div className="snapshot-grid">
              <div className="snap-card">
                <div className="snap-num">4×</div>
                <div className="snap-label">HVAC filter changes</div>
              </div>
              <div className="snap-card">
                <div className="snap-num">4×</div>
                <div className="snap-label">Professional deep cleans</div>
              </div>
              <div className="snap-card">
                <div className="snap-num">2×</div>
                <div className="snap-label">Gutter cleanings</div>
              </div>
              <div className="snap-card">
                <div className="snap-num">2×</div>
                <div className="snap-label">Smoke/CO detector checks</div>
              </div>
              <div className="snap-card">
                <div className="snap-num">1×</div>
                <div className="snap-label">HVAC tune-up</div>
              </div>
              <div className="snap-card">
                <div className="snap-num">{totalTasks}</div>
                <div className="snap-label">Total checklist tasks</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-wrap">
            <span className="progress-label">Year progress</span>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="progress-pct">{progressPercent}%</span>
          </div>

          {/* Month Cards */}
          {renderMaintenanceContent()}
        </div>
      </div>

      {/* Cleaning Tab */}
      <div className={`tab-panel ${activeTab === 'cleaning' ? 'active' : ''}`}>
        {renderCleaningContent()}
      </div>

      {/* Footer */}
      <div className="footer">
        5811 5th Street NW · Washington DC · Lot 104 · Made with care for your first year of homeownership
      </div>
    </>
  );
}

export default App;
