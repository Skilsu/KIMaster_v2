<template>
  <div>
    <h2>{{ $t('rules.qawale.game_title') }}</h2>
    <p>{{ $t('rules.qawale.description') }}</p>

    <h3>{{ $t('rules.qawale.setup.title') }}</h3>
    <ul>
      <li>{{ $t('rules.qawale.setup.point1') }}</li>
      <li>{{ $t('rules.qawale.setup.point2') }}</li>
      <li>{{ $t('rules.qawale.setup.point3') }}</li>
    </ul>

    <h3>{{ $t('rules.qawale.gameplay.title') }}</h3>
    <ul>
      <li>{{ $t('rules.qawale.gameplay.point1') }}</li>
      <li>{{ $t('rules.qawale.gameplay.point2') }}</li>
      <li>{{ $t('rules.qawale.gameplay.point3') }}</li>
      <li>{{ $t('rules.qawale.gameplay.point4') }}</li>
    </ul>

    <h3>{{ $t('rules.qawale.endgame.title') }}</h3>
    <ul>
      <li>{{ $t('rules.qawale.endgame.point1') }}</li>
      <li>{{ $t('rules.qawale.endgame.point2') }}</li>
    </ul>
  </div>
</template>

<script>
/**
 * Rules for Qawale
 * @module gameRules 
 */
export default {
  name: 'QawaleRules'
};
</script>

<style scoped>
</style>