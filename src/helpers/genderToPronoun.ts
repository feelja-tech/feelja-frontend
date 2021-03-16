export function genderToPronoun(gender?: string | null): string {
  return gender
    ? {
        male: "him",
        female: "her",
      }[gender]
    : "them";
}

export default genderToPronoun;
