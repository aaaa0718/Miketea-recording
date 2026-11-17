export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const photoSrc = (record) => record?.photo || asset('cup.svg');
