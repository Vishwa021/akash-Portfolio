export const hasLink = (u) => typeof u === 'string' && u.trim().length > 0;

export const cn = (...classes) => classes.filter(Boolean).join(' ');
