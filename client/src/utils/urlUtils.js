export const createURLSearchParams = params => {
  const searchParams = new URLSearchParams(params);
  const standardParams = new URLSearchParams();

  searchParams.forEach((value, key) => {
    if (value && value !== 'undefined')
      standardParams.append(key, value)
  })

  return standardParams.toString();
}