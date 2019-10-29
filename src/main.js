import dfareg from 'learning-regexp-engine';
import Viz from 'viz.js';
import workerURL from 'viz.js/full.render.js';

const viz = new Viz({ workerURL });

const createGraph = str => {
  const regexp = dfareg.compile(str);
  const nfaFragment = regexp.nfaFragment;

  const lines = [];
  lines.push(`start -> ${nfaFragment.start}`);

  for (const [key, val] of nfaFragment.map) {
    const [from, char] = JSON.parse(key);
    for (const to of val) {
      lines.push(`${from} -> ${to} [label=${char || 'ε'}]`);
    }
  }

  for (const state of nfaFragment.accepts) {
    lines.push(`${state} [shape = doublecircle]`);
  }

  return `digraph NFA {
node [shape = circle]
edge [arrowhead = vee]
start [shape = none]
${lines.join('\n')}
}`;
}

const render = async () => {
  const str = document.getElementById('regexp').value;
  try {
    const dot = createGraph(str);
    console.log(dot);
    const element = await viz.renderSVGElement(dot);
    document.getElementById('error').innerHTML = '';
    document.getElementById('nfa').innerHTML = '';
    document.getElementById('nfa').append(element);
  } catch (e) {
    document.getElementById('error').innerHTML = e.toString();
    document.getElementById('nfa').innerHTML = '';
  }
}

document.getElementById('regexp').addEventListener('input', ev => {
  ev.target.value = ev.target.value.replace(/\s/g, '');
  render();
});

render();
