export const formatLinkedCompetencies = (linkedCompetencies = []) =>
  linkedCompetencies.map(competency => ({ _id: competency.value }));

export const convertLinkedCompetenciesToInputFormat = (competencies = []) =>
  competencies.map(competency => ({
    value: competency._id,
    label: competency.name,
  }));
