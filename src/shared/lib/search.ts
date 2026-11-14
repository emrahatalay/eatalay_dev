/**
 * Folds text for forgiving search: lower case, no accents, Turkish dotless "ı" as "i".
 * "MESAİ", "mesai" and "Mesaı" all fold to "mesai".
 */
export function foldForSearch(text: string, locale: string): string {
  return text
    .toLocaleLowerCase(locale)
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ı/g, "i");
}

/** True when every word of the query appears somewhere in the folded haystack. */
export function matchesQuery(haystack: string, query: string, locale: string): boolean {
  const terms = foldForSearch(query, locale).split(/\s+/).filter(Boolean);
  return terms.every((term) => haystack.includes(term));
}
