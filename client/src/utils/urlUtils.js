export const createURLSearchParams = params => {
    const searchParams = new URLSearchParams(params);
    const standardParams = new URLSearchParams();

    searchParams.forEach((v, k) => {
      if (v && v !== 'undefined')
      standardParams.append(k, v)
    })

    return standardParams.toString();
}