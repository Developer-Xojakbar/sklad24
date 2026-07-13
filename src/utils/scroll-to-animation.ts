export const scrollToAnimation = (e: any, id: string, offset = 80) => {
  e.preventDefault();

  const root = document.getElementById('root');
  const element = document.getElementById(id);
  if (!element || !root) return;

  const y = element.offsetTop - offset;
  root.scrollTo({ top: y, behavior: 'smooth' });
};

export const scrollFromToAnimation = (from: string, to: string, offset = 80) => {
  const fromElement = document.getElementById(from);
  const toElement = document.getElementById(to);
  if (!fromElement || !toElement) return;

  const toY = toElement.offsetTop - offset;
  fromElement.scrollTo({ top: toY, behavior: 'smooth' });
};
