export type PathKey = string | number;

export function setAtPath(obj: unknown, path: PathKey[], value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;

  if (Array.isArray(obj)) {
    const clone = [...obj];
    clone[head as number] = setAtPath(obj[head as number], rest, value);
    return clone;
  }

  const source = (obj as Record<PathKey, unknown>) ?? {};
  const clone = { ...source };
  clone[head] = setAtPath(source[head], rest, value);
  return clone;
}
