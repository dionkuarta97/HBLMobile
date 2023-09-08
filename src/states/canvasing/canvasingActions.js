import dionServer from '../dionServer';

export const getDpt = async nik => {
  try {
    const {data} = await dionServer({
      url: '/canvasing/question/' + nik,
      method: 'get',
    });
    return data;
  } catch (err) {
    throw {message: 'data tidak ditemukan atau sudah diisi semua'};
  }
};

export const kirimCanvasing = body => {
  return new Promise(async (resolve, rejected) => {
    try {
      const {data} = await dionServer({
        url: '/canvasing/kirim',
        method: 'post',
        data: body,
      });
      resolve('jawaban berhasil dikirim');
    } catch (error) {
      console.log(error);
      rejected('terjadi kesalahan pada server');
    }
  });
};
