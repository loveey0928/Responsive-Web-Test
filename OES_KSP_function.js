var waveLength1 = '';
var waveLength2 = '';

function SelectWaveLength() {
  waveLength1 = document.getElementById('waveLength1');
  waveLength2 = document.getElementById('waveLength2');
  alert(
    'waveLength 1 : ' +
      waveLength1.value +
      ' nm' +
      '\n' +
      'waveLength 2 : ' +
      waveLength2.value +
      ' nm'
  );
  console.log(waveLength1);
}
