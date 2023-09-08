import dionServer from './dionServer';

export const getPenugasanQuickCount = async id => {
  try {
    const {data} = await dionServer({
      url: '/quickcount/penugasan/' + id,
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCaleg = async id => {
  try {
    const {data} = await dionServer({
      url: '/quickcount/caleg/' + id,
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const kirimQuickCount = async (body, id) => {
  try {
    const data = await dionServer({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: '/quickcount/13',
      method: 'post',

      data: body,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
