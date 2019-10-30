import dfareg from 'learning-regexp-engine';
import Viz from 'viz.js';
import workerURL from 'viz.js/full.render.js';

const viz = new Viz({ workerURL });

const createGraph = (pattern, string) => {
  const regexp = dfareg.compile(pattern);
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
    lines.push(`${state} [shape=doublecircle]`);
  }

  const dfaRuntime = regexp.dfa.getRuntime();
  const match = dfaRuntime.doesAccept(string);

  for (const state of dfaRuntime.curState) {
    lines.push(`${state} [style=filled, fillcolor="#FF0000"]`);
  }
  console.log(dfaRuntime.curState);

  return `digraph NFA {
graph [rankdir=LR]
node [shape=circle]
edge [arrowhead=vee]
start [shape=none]
${lines.join('\n')}
}`;
}

const render = async () => {
  const pattern = document.getElementById('pattern').value;
  const string = document.getElementById('string').value;
  try {
    const dot = createGraph(pattern, string);
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

document.getElementById('pattern').addEventListener('input', ev => {
  ev.target.value = ev.target.value.replace(/\s/g, '');
  render();
});

document.getElementById('string').addEventListener('input', ev => render());

render();
