// Author: neformal13 https://gist.github.com/neformal13/00ac31d02eedf669768bd106482d2d3c
type Modifier = any[] | Record<string, any>;
type B = (b: string) => (elementName?: string | Modifier, modifiers?: Modifier) => string;
type GetBEMPAth = (b: string, e: string, m: string[]) => string;

const ELEMENT_SEPARATOR = "__";
const MODIFIER_SEPARATOR = "_";

const getBEMPAth: GetBEMPAth = (b, e, m) => {
  const base = e !== "" ? [b, e].join(ELEMENT_SEPARATOR) : b;

  return `${base} ${m.reduce((str, m) => `${str} ${base}${MODIFIER_SEPARATOR}${m}`, "")}`;
};

const b: B =
  (b) =>
  (elementName, modifiers = []) => {
    modifiers = typeof elementName === "string" ? modifiers : elementName || [];

    return getBEMPAth(
      b,
      typeof elementName === "string" ? elementName : "",
      Array.isArray(modifiers)
        ? modifiers.filter(Boolean)
        : Object.entries(modifiers)
            .filter(([, value]) => Boolean(value))
            .map(([key]) => key)
    );
  };

export default b;

// Tests
const a = b("Hello"); /*?*/
a(); /*?*/
a(["men", "women"]); /*?*/
a({ men: true, women: false }); /*?*/
a("world"); /*?*/
a("world", ["mars", "venera"]); /*?*/
a("world", { mars: true, venera: false }); /*?*/
