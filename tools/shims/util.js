/**
 * Substitut navigateur du module Node `util`, pour la compilation de JSCPP.
 *
 * La dependance `printf` de JSCPP n'utilise que `util.inspect`, et seulement
 * pour afficher une valeur non chainifiable dans un `%v`. Une implementation
 * courte suffit donc largement.
 */
export function inspect(value, options = {}) {
  const depthMax = typeof options.depth === 'number' ? options.depth : 2;

  const render = (val, depth, seen) => {
    if (val === null) return 'null';
    const type = typeof val;
    if (type === 'string') return depth === 0 ? val : `'${val}'`;
    if (type === 'number' || type === 'boolean' || type === 'undefined') return String(val);
    if (type === 'bigint') return `${val}n`;
    if (type === 'symbol') return val.toString();
    if (type === 'function') return `[Function${val.name ? `: ${val.name}` : ''}]`;

    if (seen.has(val)) return '[Circular]';
    if (depth > depthMax) return Array.isArray(val) ? '[Array]' : '[Object]';
    seen.add(val);

    try {
      if (Array.isArray(val)) {
        return `[ ${val.map((item) => render(item, depth + 1, seen)).join(', ')} ]`;
      }
      const entries = Object.keys(val).map(
        (key) => `${key}: ${render(val[key], depth + 1, seen)}`
      );
      return `{ ${entries.join(', ')} }`;
    } finally {
      seen.delete(val);
    }
  };

  return render(value, 0, new Set());
}

export default { inspect };
