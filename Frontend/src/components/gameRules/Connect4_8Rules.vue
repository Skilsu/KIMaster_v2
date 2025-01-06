<template>
  <div>
    <h2>{{ $t('rules.connect4_8.game_title') }}</h2>
    <p>{{ $t('rules.connect4_8.description') }}</p>

    <h3>{{ $t('rules.connect4_8.setup.title') }}</h3>
    <ul>
      <li>{{ $t('rules.connect4_8.setup.point1') }}</li>
      <li>{{ $t('rules.connect4_8.setup.point2') }}</li>
    </ul>

    <h3>{{ $t('rules.connect4_8.gameplay.title') }}</h3>
    <ul>
      <li>{{ $t('rules.connect4_8.gameplay.point1') }}</li>
      <li>{{ $t('rules.connect4_8.gameplay.point2') }}</li>
      <li>{{ $t('rules.connect4_8.gameplay.point3') }}</li>
    </ul>

    <h3>{{ $t('rules.connect4_8.endgame.title') }}</h3>
    <ul>
      <li>{{ $t('rules.connect4_8.endgame.point1') }}</li>
      <li>{{ $t('rules.connect4_8.endgame.point2') }}</li>
    </ul>
  </div>
</template>

<script>
/**
  * Rules for Connect4_8
  * @module gameRules 
  */
export default {
  name: 'Connect4_8Rules'
};
</script>
