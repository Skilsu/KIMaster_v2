<template>
  <div class="move-analysis" v-if="analysis">
    <!-- Hauptnachricht -->
    <div class="analysis-message" :class="messageClass">
      {{ analysis.message }}
    </div>

    <!-- Strategische Muster -->
    <div class="analysis-patterns" v-if="hasPatterns">
      <h4>{{ $t('analysis.strategic_patterns') }}</h4>
      <ul>
        <li v-for="pattern in activePatterns" :key="pattern">
          <span class="pattern-icon">✓</span>
          {{ $t(`analysis.patterns.${pattern}`) }}
        </li>
      </ul>
    </div>

    <!-- Taktische Muster -->
    <div class="analysis-tactics" v-if="hasTactics">
      <h4>{{ $t('analysis.tactical_patterns') }}</h4>
      <ul>
        <li v-for="tactic in activeTactics" :key="tactic">
          <span class="tactic-icon">⚡</span>
          {{ $t(`analysis.tactics.${tactic}`) }}
        </li>
      </ul>
    </div>

    <!-- Alternative Züge -->
    <div class="analysis-alternatives" v-if="analysis.alternatives.length">
      <h4>{{ $t('analysis.better_moves') }}</h4>
      <ul>
        <li v-for="(alt, index) in analysis.alternatives" :key="index">
          {{ analysis.explanations[index] }}
        </li>
      </ul>
    </div>

    <!-- Beste Zugsequenz -->
    <div class="analysis-sequence" v-if="analysis.move_sequences.length">
      <h4>{{ $t('analysis.best_sequence') }}</h4>
      <div class="sequence-moves">
        <div v-for="(move, index) in bestSequence" :key="index" class="sequence-move">
          {{ index + 1 }}. {{ formatMove(move[0]) }} ({{ formatValue(move[1]) }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoveAnalysis',
  props: {
    analysis: {
      type: Object,
      required: true
    }
  },
  computed: {
    messageClass() {
      if (!this.analysis) return '';
      const value_change = this.analysis.current_value;
      if (value_change > 0.1) return 'positive';
      if (value_change < -0.1) return 'negative';
      return 'neutral';
    },
    hasPatterns() {
      return this.activePatterns.length > 0;
    },
    hasTactics() {
      return this.activeTactics.length > 0;
    },
    activePatterns() {
      if (!this.analysis?.strategic_patterns) return [];
      return Object.entries(this.analysis.strategic_patterns)
        .filter(([_, active]) => active)
        .map(([pattern]) => pattern);
    },
    activeTactics() {
      if (!this.analysis?.tactical_patterns) return [];
      return Object.entries(this.analysis.tactical_patterns)
        .filter(([_, active]) => active)
        .map(([tactic]) => tactic);
    },
    bestSequence() {
      if (!this.analysis?.move_sequences?.length) return [];
      return this.analysis.move_sequences[0];
    }
  },
  methods: {
    formatMove(move) {
      if (!move) return '';
      const [row1, col1, row2, col2] = move;
      return `${row1},${col1} → ${row2},${col2}`;
    },
    formatValue(value) {
      if (typeof value !== 'number') return '';
      return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
    }
  }
}
</script>

<style scoped>
.move-analysis {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  margin: 1rem 0;
}

.analysis-message {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.analysis-message.positive {
  background-color: #e6ffe6;
  color: #006600;
}

.analysis-message.negative {
  background-color: #ffe6e6;
  color: #cc0000;
}

.analysis-message.neutral {
  background-color: #f0f0f0;
  color: #666666;
}

.analysis-patterns, .analysis-tactics, .analysis-alternatives, .analysis-sequence {
  margin-top: 1rem;
}

h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
}

.pattern-icon, .tactic-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.pattern-icon {
  color: #4CAF50;
}

.tactic-icon {
  color: #FFC107;
}

.sequence-moves {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sequence-move {
  background-color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-family: monospace;
}
</style> 