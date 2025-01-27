<template>
  <div class="ai-performance" v-if="game === 'tictactoe' && performance">
    <div class="performance-header">
      <h3>{{ $t('ai.performance_title') }}</h3>
      <div class="performance-icon" :class="{ pulsing: performance.win_probability > 0.7 }">🤖</div>
    </div>

    <div class="performance-stats">
      <!-- Hauptindikator: Gewinnwahrscheinlichkeit -->
      <div class="main-indicator">
        <svg class="progress-ring" width="120" height="120">
          <circle
            class="progress-ring__circle-bg"
            stroke="#e0e0e0"
            stroke-width="8"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            class="progress-ring__circle"
            :stroke="getValueColor(performance.win_probability)"
            stroke-width="8"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
            :style="{ 
              strokeDasharray: `${2 * Math.PI * 52}`,
              strokeDashoffset: `${2 * Math.PI * 52 * (1 - (performance.win_probability || 0))}`
            }"
          />
          <text x="60" y="60" class="progress-text" text-anchor="middle" dominant-baseline="middle">
            {{ formatPercentage(performance.win_probability) }}
          </text>
        </svg>
        <div class="win-probability-text">
          {{ formatPercentage(performance.win_probability) }} {{ $t('ai.win_probability') }}
        </div>
      </div>

      <!-- Detaillierte Statistiken -->
      <div class="stats-details">
        <div class="stat-row">
          <span class="stat-label">{{ $t('ai.win_probability') }}</span>
          <div class="stat-bar-container">
            <div class="stat-bar">
              <div 
                class="stat-bar-fill"
                :style="{ 
                  width: `${(performance.win_probability || 0) * 100}%`,
                  backgroundColor: getValueColor(performance.win_probability)
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance-Nachricht -->
      <div class="performance-message" :class="getMessageClass(performance.win_probability)">
        {{ getPerformanceMessage(performance.win_probability) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIPerformance',
  props: {
    game: {
      type: String,
      required: true
    },
    performance: {
      type: Object,
      default: null
    }
  },
  watch: {
    performance(newVal) {
      console.log('Performance data updated:', newVal);
    }
  },
  methods: {
    formatPercentage(value) {
      if (!value && value !== 0) return '0%';
      return `${Math.round(value * 100)}%`;
    },
    getValueColor(value) {
      if (!value && value !== 0) return '#9e9e9e';
      if (value >= 0.7) return '#4CAF50';
      if (value >= 0.4) return '#FFC107';
      return '#F44336';
    },
    getPerformanceMessage(value) {
      if (!value && value !== 0) return 'Warte auf Analyse...';
      if (value >= 0.7) return 'Sehr gute Position!';
      if (value >= 0.4) return 'Ausgeglichene Position';
      return 'Schwierige Position';
    },
    getMessageClass(value) {
      if (!value && value !== 0) return 'neutral';
      if (value >= 0.7) return 'positive';
      if (value >= 0.4) return 'warning';
      return 'negative';
    }
  },
  mounted() {
    console.log('AIPerformance component mounted. Game:', this.game, 'Performance:', this.performance);
  }
};
</script>

<style scoped>
.ai-performance {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.ai-performance:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.performance-icon {
  font-size: 2rem;
  transition: all 0.3s ease;
}

.performance-icon.pulsing {
  animation: pulse 2s infinite;
}

.main-indicator {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.5s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-ring__circle-bg {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-text {
  font-size: 1.5rem;
  font-weight: bold;
  fill: #2c3e50;
}

.stats-details {
  margin: 1.5rem 0;
}

.stat-row {
  margin: 0.8rem 0;
}

.stat-label {
  display: block;
  margin-bottom: 0.4rem;
  color: #666;
  font-size: 0.9rem;
}

.stat-bar-container {
  width: 100%;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.stat-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
}

.stat-bar-fill {
  height: 100%;
  transition: width 0.5s ease, background-color 0.3s ease;
}

.performance-message {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.performance-message.positive {
  background-color: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
}

.performance-message.warning {
  background-color: rgba(255, 193, 7, 0.1);
  color: #f57f17;
}

.performance-message.negative {
  background-color: rgba(244, 67, 54, 0.1);
  color: #d32f2f;
}

.performance-message.neutral {
  background-color: rgba(158, 158, 158, 0.1);
  color: #616161;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 600;
}

.win-probability-text {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
  color: #2c3e50;
}
</style> 